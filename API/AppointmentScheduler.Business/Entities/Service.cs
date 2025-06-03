using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduler.Business.Entities
{
    public class Service : BusinessObject<long>
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Name { get; set; }

        [Required]
        [GreaterThanOrEqualTo(1)]
        public int Duration { get; set; } // In minutes
        public virtual List<Appointment> Appointments { get; } = new();

        
    }
}
