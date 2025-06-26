using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.BaseEntities;
using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduler.Business.Entities
{
    [DoNotAuthorize]
    public class Service : BusinessObject<long>
    {
        [DisplayName]
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Name { get; set; }

        [Required]
        [GreaterThanOrEqualTo(1)]
        public int Duration { get; set; } // In minutes

        public virtual List<Appointment> Appointments { get; } = new();

        
    }
}
