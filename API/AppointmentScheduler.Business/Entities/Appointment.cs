using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.Attributes.EF.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduler.Business.Entities
{
    public class Appointment: BusinessObject<long>
    {
        [Required]
        public bool IsCanceled { get; set; }
        [Required]
        public bool HasConfirmed { get; set; }

        [Required]
        public DateTime ReservedAt { get; set; }

        [Required]
        public DateTime ExpiredAt { get; set; }

        [WithMany(nameof(Service.Appointments))]
        [ManyToOneRequired]
        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        public virtual Service Service { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        [WithMany(nameof(Doctor.DoctorAppointments))]
        [ManyToOneRequired]
        public virtual UserExtended Doctor { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.Autocomplete))]
        [WithMany(nameof(Doctor.PatientAppointments))]
        public virtual UserExtended Patient { get; set; }

        
    }
}
