using AppointmentScheduler.Business.DTO;
using AppointmentScheduler.Business.Entities;
using Mapster;
using Spiderly.Shared.Attributes;

namespace AppointmentScheduler.Business.DataMappers
{
    [CustomMapper]
    public static partial class Mapper
    {
        public static TypeAdapterConfig AppointmentProjectToConfig()
        {
            TypeAdapterConfig config = new TypeAdapterConfig();

            config
                .NewConfig<Appointment, AppointmentDTO>()
                .Map(dest => dest.ServiceId, src => src.Service.Id)
                .Map(dest => dest.ServiceDisplayName, src => src.Service.Name)
                .Map(dest => dest.DoctorId, src => src.Doctor.Id)
                .Map(dest => dest.DoctorDisplayName, src => src.Doctor.Email)
                .Map(dest => dest.DoctorColor, src => src.Doctor.DoctorColor)
                .Map(dest => dest.PatientId, src => src.Patient.Id)
                .Map(dest => dest.PatientDisplayName, src => src.Patient.Email)
                ;

            return config;
        }
    }
}
