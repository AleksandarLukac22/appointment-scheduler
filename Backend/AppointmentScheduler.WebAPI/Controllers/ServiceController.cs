using Microsoft.AspNetCore.Mvc;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Interfaces;
using Azure.Storage.Blobs;
using Spiderly.Security.Services;
using AppointmentScheduler.Business.Services;
using AppointmentScheduler.Business.DTO;

namespace AppointmentScheduler.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class ServiceController : ServiceBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly AppointmentSchedulerBusinessService _appointmentSchedulerBusinessService;
        private readonly AuthenticationService _authenticationService;

        public ServiceController(
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

    }
}

