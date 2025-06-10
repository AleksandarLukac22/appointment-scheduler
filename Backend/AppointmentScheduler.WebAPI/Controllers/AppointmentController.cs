using AppointmentScheduler.Business.DTO;
using AppointmentScheduler.Business.Entities;
using AppointmentScheduler.Business.Services;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using Spiderly.Security.Services;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Interfaces;

namespace AppointmentScheduler.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class AppointmentController : AppointmentBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly AppointmentSchedulerBusinessService _appointmentSchedulerBusinessService;
        private readonly AuthenticationService _authenticationService;

        public AppointmentController(
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
        [HttpPost]
        [AuthGuard]
        public override async Task<TableResponseDTO<AppointmentDTO>> GetAppointmentTableData(TableFilterDTO tableFilterDTO)
        {
            return await _appointmentSchedulerBusinessService.GetAppointmentTableData(tableFilterDTO, _context.DbSet<Appointment>(), false);
        }
    }
}

