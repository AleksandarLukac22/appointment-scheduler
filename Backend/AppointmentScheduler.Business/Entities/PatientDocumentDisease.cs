using Spiderly.Shared.Attributes.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduler.Business.Entities
{
    public class PatientDocumentDisease
    {
        [M2MMaintanceEntity(nameof(PatientDocument.Diseases))]
        public virtual PatientDocument PatientDocument { get; set; }

        [M2MEntity(nameof(Disease.PatientDocuments))]
        public virtual Disease Disease { get; set; }

    }
}
