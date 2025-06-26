using Spiderly.Shared.Attributes.Entity;
using Spiderly.Shared.BaseEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduler.Business.Entities
{
    public class Gender:ReadonlyObject<long>
    {
        [Required]
        [StringLength(70,MinimumLength =1)]
        [DisplayName]
        public string Name { get; set; }

        public virtual List<UserExtended> Users { get; } = new();

    }
}
