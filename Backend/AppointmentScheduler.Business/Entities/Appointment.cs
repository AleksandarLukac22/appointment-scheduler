using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.Attributes.Entity.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduler.Business.Entities
{
    [DoNotAuthorize]
    public class Appointment: BusinessObject<long>
    {   
        public bool? IsCanceled { get; set; }

        [Required]
        public DateTime ReservedAt { get; set; }

        [WithMany(nameof(Service.Appointments))]
        [Required]
        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        public virtual Service Service { get; set; }

        [Required]
        public DateTime ExpiredAt { get; set; }


        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        [WithMany(nameof(Doctor.DoctorAppointments))]
        [Required]
        public virtual UserExtended Doctor { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.Autocomplete))]
        [WithMany(nameof(Doctor.PatientAppointments))]
        public virtual UserExtended Patient { get; set; }

        
    }
}
