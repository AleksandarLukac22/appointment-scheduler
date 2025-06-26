using Spiderly.Shared.Attributes.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduler.Business.Entities
{
    [M2M]
    public class PatientDocumentDisease
    {
        [M2MWithMany(nameof(PatientDocument.Diseases))]
        public virtual PatientDocument PatientDocument { get; set; }

        [M2MWithMany(nameof(Disease.PatientDocuments))]
        public virtual Disease Disease { get; set; }

    }
}
