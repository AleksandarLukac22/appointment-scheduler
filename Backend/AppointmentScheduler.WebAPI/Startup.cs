using LightInject;
using Spiderly.Shared.Helpers;
using Spiderly.Shared.Extensions;
using AppointmentScheduler.WebAPI.DI;
using AppointmentScheduler.Infrastructure;
using Quartz;

public class Startup
{
    public static string _jsonConfigurationFile = "appsettings.json";
    private readonly IHostEnvironment _hostEnvironment;

    public Startup(IConfiguration configuration, IHostEnvironment hostEnvironment)
    {
        Configuration = configuration;
        _hostEnvironment = hostEnvironment;

        if (_hostEnvironment.IsStaging())
            _jsonConfigurationFile = "appsettings.Staging.json";
        else if (_hostEnvironment.IsProduction())
            _jsonConfigurationFile = "appsettings.Production.json";

        AppointmentScheduler.WebAPI.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<AppointmentScheduler.WebAPI.Settings>(_jsonConfigurationFile);
        AppointmentScheduler.Business.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<AppointmentScheduler.Business.Settings>(_jsonConfigurationFile);
        Spiderly.Infrastructure.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spiderly.Infrastructure.Settings>(_jsonConfigurationFile);
        Spiderly.Security.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spiderly.Security.Settings>(_jsonConfigurationFile);
        Spiderly.Shared.SettingsProvider.Current = Helper.ReadAssemblyConfiguration<Spiderly.Shared.Settings>(_jsonConfigurationFile);
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.SpiderlyConfigureServices<AppointmentSchedulerApplicationDbContext>();
    }

    public void ConfigureContainer(IServiceContainer container)
    {
        container.RegisterInstance(container);

        container.RegisterFrom<CompositionRoot>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.SpiderlyConfigure(env);

        app.UseEndpoints(endpoints =>
        {
            endpoints
                .MapControllers();
        });
    }
}
