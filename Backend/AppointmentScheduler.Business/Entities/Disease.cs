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
    [DoNotAuthorize]
    public class Disease:BusinessObject<long>
    {

        [StringLength(70, MinimumLength = 1)]
        [Required]
        public string Name { get; set; }

        public virtual List<PatientDocument> PatientDocuments { get; } = new(); //M2M
    }
}
