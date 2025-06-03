using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Attributes.EF.UI;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.DTO;
using AppointmentScheduler.Business.DTO;
using AppointmentScheduler.Business.Services;

namespace AppointmentScheduler.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class NotificationController : NotificationBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly AppointmentSchedulerBusinessService _appointmentSchedulerBusinessService;

        public NotificationController(
            IApplicationDbContext context, 
            AppointmentSchedulerBusinessService appointmentSchedulerBusinessService
        )
            : base(context, appointmentSchedulerBusinessService)
        {
            _context = context;
            _appointmentSchedulerBusinessService = appointmentSchedulerBusinessService;
        }

        [HttpGet]
        [AuthGuard]
        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _appointmentSchedulerBusinessService.SendNotificationEmail(notificationId, notificationVersion);
        }

        [HttpDelete]
        [AuthGuard]
        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _appointmentSchedulerBusinessService.DeleteNotificationForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _appointmentSchedulerBusinessService.MarkNotificationAsReadForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _appointmentSchedulerBusinessService.MarkNotificationAsUnreadForCurrentUser(notificationId, notificationVersion);
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        [UIDoNotGenerate]
        public async Task<int> GetUnreadNotificationsCountForCurrentUser()
        {
            return await _appointmentSchedulerBusinessService.GetUnreadNotificationsCountForCurrentUser();
        }

        [HttpPost]
        [AuthGuard]
        public async Task<TableResponseDTO<NotificationDTO>> GetNotificationsForCurrentUser(TableFilterDTO tableFilterDTO)
        {
            return await _appointmentSchedulerBusinessService.GetNotificationsForCurrentUser(tableFilterDTO);
        }

    }
}

