using AppointmentScheduler.Business.Services;
using AppointmentScheduler.Business.Entities;
using AppointmentScheduler.Business.DTO;
using AppointmentScheduler.Business.Enums;
using AppointmentScheduler.Business.DataMappers;
using AppointmentScheduler.Business.ValidationRules;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Excel;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.Extensions;
using Spiderly.Shared.Helpers;
using Spiderly.Security.DTO;
using Spiderly.Security.Services;
using Spiderly.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;
using Mapster;
using FluentValidation;
using Spiderly.Shared.Emailing;
using Azure.Storage.Blobs;

namespace AppointmentScheduler.Business.Services
{
    public class AppointmentSchedulerBusinessService : AppointmentScheduler.Business.Services.BusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly AppointmentScheduler.Business.Services.AuthorizationBusinessService _authorizationService;
        private readonly AuthenticationService _authenticationService;
        private readonly SecurityBusinessService<UserExtended> _securityBusinessService;
        private readonly EmailingService _emailingService;

        public AppointmentSchedulerBusinessService(
            IApplicationDbContext context,
            ExcelService excelService,
            AppointmentScheduler.Business.Services.AuthorizationBusinessService authorizationService,
            SecurityBusinessService<UserExtended> securityBusinessService,
            AuthenticationService authenticationService,
            EmailingService emailingService,
            IFileManager fileManager
        )
            : base(context, excelService, authorizationService, fileManager)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
            _authenticationService = authenticationService;
            _emailingService = emailingService;
        }

        #region User

        /// <summary>
        /// IsDisabled is handled inside authorization service
        /// </summary>
        protected override async Task OnBeforeSaveUserExtendedAndReturnSaveBodyDTO(UserExtendedSaveBodyDTO userExtendedSaveBodyDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (userExtendedSaveBodyDTO.UserExtendedDTO.Id <= 0)
                    throw new HackerException("You can't add new user.");

                UserExtended userExtended = await GetInstanceAsync<UserExtended, long>(userExtendedSaveBodyDTO.UserExtendedDTO.Id, userExtendedSaveBodyDTO.UserExtendedDTO.Version);

                if (userExtendedSaveBodyDTO.UserExtendedDTO.Email != userExtended.Email ||
                    userExtendedSaveBodyDTO.UserExtendedDTO.HasLoggedInWithExternalProvider != userExtended.HasLoggedInWithExternalProvider
                //userExtendedSaveBodyDTO.UserExtendedDTO.AccessedTheSystem != userExtended.AccessedTheSystem
                )
                {
                    throw new HackerException("You can't change Email, HasLoggedInWithExternalProvider nor AccessedTheSystem from the main UI form.");
                }
            });
        }

        #endregion

        #region Notification

        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeAndThrowAsync<UserExtended>(BusinessPermissionCodes.UpdateNotification);

                // Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users
                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                List<string> recipients = notification.Recipients.Select(x => x.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, notification.Title, notification.EmailBody);
            });
        }

        /// <summary>
        /// Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteDeleteAsync();
            });
        }

        /// <summary>
        /// Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, true));
            });
        }

        /// <summary>
        /// Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, false));
            });
        }

        public async Task<int> GetUnreadNotificationsCountForCurrentUser()
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.IsMarkedAsRead == false);

                int count = await notificationUsersQuery.CountAsync();

                return count;
            });
        }

        public async Task<TableResponseDTO<NotificationDTO>> GetNotificationsForCurrentUser(TableFilterDTO tableFilterDTO)
        {
            TableResponseDTO<NotificationDTO> result = new();
            long currentUserId = _authenticationService.GetCurrentUserId(); // Not doing user.Notifications, because he could have a lot of them.

            await _context.WithTransactionAsync(async () =>
            {
                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId)
                    .Select(x => new
                    {
                        UserId = x.User.Id,
                        NotificationId = x.Notification.Id,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                    });

                int count = await notificationUsersQuery.CountAsync();

                var notificationUsers = await notificationUsersQuery
                    .Skip(tableFilterDTO.First)
                    .Take(tableFilterDTO.Rows)
                    .ToListAsync();

                List<NotificationDTO> notificationsDTO = new();

                foreach (var item in notificationUsers)
                {
                    NotificationDTO notificationDTO = new();

                    Notification notification = await GetInstanceAsync<Notification, long>(item.NotificationId, null);
                    notificationDTO.Id = notification.Id;
                    notificationDTO.Version = notification.Version;
                    notificationDTO.Title = notification.Title;
                    notificationDTO.Description = notification.Description;
                    notificationDTO.CreatedAt = notification.CreatedAt;

                    notificationDTO.IsMarkedAsRead = item.IsMarkedAsRead;

                    notificationsDTO.Add(notificationDTO);
                }

                notificationsDTO = notificationsDTO.OrderByDescending(x => x.CreatedAt).ToList();

                result.Data = notificationsDTO;
                result.TotalRecords = count;
            });

            return result;
        }

        #endregion

        #region Service

        public override Task OnBeforeServiceDelete(long id)
        {
            if (id == 1)
            {
                throw new BusinessException("Ne možete da obrišete ovaj servis.");
            }

            return base.OnBeforeServiceDelete(id);
        }


        #endregion

        #region Appointment

        protected override Task OnBeforeSaveAppointmentAndReturnSaveBodyDTO(AppointmentSaveBodyDTO saveBodyDTO)
        {
            int startOfWorkingHours = 9;
            int startOfWorkingMinutes = 0;
            int endOfWorkingHours = 17;
            int endOfWorkingMinutes = 0;
         
            int reservedAt = saveBodyDTO.AppointmentDTO.ReservedAt.Value.Hour*60 + saveBodyDTO.AppointmentDTO.ReservedAt.Value.Minute;
            int startOfWorking = startOfWorkingHours * 60 + startOfWorkingMinutes;
            int endOfWorking = endOfWorkingHours * 60 + endOfWorkingMinutes;

            if (!(reservedAt >= startOfWorking
                && reservedAt <= endOfWorking))
            {
                throw new BusinessException("Ne možete zakazati van radnog vremena");
            }


            return _context.WithTransactionAsync(async () =>
            {
                Service service = await GetInstanceAsync<Service, long>(saveBodyDTO.AppointmentDTO.ServiceId.Value, null);
                int serviceDuration = service.Duration;

                saveBodyDTO.AppointmentDTO.ExpiredAt = saveBodyDTO.AppointmentDTO.ReservedAt.Value.AddMinutes(serviceDuration);
                return base.OnBeforeSaveAppointmentAndReturnSaveBodyDTO(saveBodyDTO);

            });


        }

        #endregion

        #region PatientDocument

        protected override Task OnBeforeSavePatientDocumentAndReturnSaveBodyDTO(PatientDocumentSaveBodyDTO saveBodyDTO)
        {

            return _context.WithTransactionAsync(async () =>
            {


                DateTime now = DateTime.Now;

                DateTime expireAt = now.AddMonths(6);

                saveBodyDTO.PatientDocumentDTO.ExpireAt = expireAt;

                long currentUserId = _authenticationService.GetCurrentUserId();

                saveBodyDTO.PatientDocumentDTO.PatientId = currentUserId;

                return base.OnBeforeSavePatientDocumentAndReturnSaveBodyDTO(saveBodyDTO);

            });

        }




        #endregion
    }
}
