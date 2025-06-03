using Microsoft.AspNetCore.Mvc;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Interfaces;
using Azure.Storage.Blobs;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Resources;
using Spiderly.Security.Services;
using AppointmentScheduler.Business.Services;
using AppointmentScheduler.Business.DTO;
using AppointmentScheduler.Business.Entities;

namespace AppointmentScheduler.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserExtendedController : UserExtendedBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly AppointmentSchedulerBusinessService _appointmentSchedulerBusinessService;
        private readonly AuthenticationService _authenticationService;

        public UserExtendedController(
            IApplicationDbContext context, 
            AppointmentSchedulerBusinessService appointmentSchedulerBusinessService, 
            AuthenticationService authenticationService
        )
            : base(context, appointmentSchedulerBusinessService)
        {
            _context = context;
            _appointmentSchedulerBusinessService = appointmentSchedulerBusinessService;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<UserExtendedDTO> GetCurrentUserExtended()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _appointmentSchedulerBusinessService.GetUserExtendedDTO(userId, false); // Don't need to authorize because he is current user
        }

    }
}

