using LightInject;
using Spiderly.Security.Interfaces;
using Spiderly.Shared.Excel;
using Spiderly.Security.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;
using Spiderly.Shared.Emailing;
using AppointmentScheduler.Business.Services;
using AppointmentScheduler.Business.Entities;
using AppointmentScheduler.Shared.FluentValidation;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.Services;

namespace AppointmentScheduler.WebAPI.DI
{
    public class CompositionRoot : ICompositionRoot
    {
        public virtual void Compose(IServiceRegistry registry)
        {
            // Framework
            registry.Register<AuthenticationService>();
            registry.Register<AuthorizationService>();
            registry.Register<SecurityBusinessService<UserExtended>>();
            registry.Register<Spiderly.Security.Services.BusinessServiceGenerated<UserExtended>>();
            registry.Register<Spiderly.Security.Services.AuthorizationBusinessService<UserExtended>>();
            registry.Register<Spiderly.Security.Services.AuthorizationBusinessServiceGenerated<UserExtended>>();
            registry.Register<ExcelService>();
            registry.Register<EmailingService>();
            registry.Register<IFileManager, BlobStorageService>();
            registry.RegisterSingleton<IConfigureOptions<MvcOptions>, TranslatePropertiesConfiguration>();
            registry.RegisterSingleton<IJwtAuthManager, JwtAuthManagerService>();

            // Business
            registry.Register<AppointmentScheduler.Business.Services.AppointmentSchedulerBusinessService>();
            registry.Register<AppointmentScheduler.Business.Services.BusinessServiceGenerated>();
            registry.Register<AppointmentScheduler.Business.Services.AuthorizationBusinessService>();
            registry.Register<AppointmentScheduler.Business.Services.AuthorizationBusinessServiceGenerated>();
        }
    }
}
