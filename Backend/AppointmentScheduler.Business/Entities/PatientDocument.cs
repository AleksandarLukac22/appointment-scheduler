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
    [DoNotAuthorize]
    public class PatientDocument : BusinessObject<long>
    {
        [UIDoNotGenerate]
        [Required]
        public DateTime ExpireAt { get; set; }

        [Required]
        public bool IsPatientUnhealthy { get; set; }

        [StringLength(70, MinimumLength = 1)]
        public string PatientIllness { get; set; }

        [Required]
        public bool IsTreatedByDoctor { get; set; }

        [StringLength(70, MinimumLength = 1)]
        public string TreatedIllness { get; set; }

        [Required]
        public bool HasBeenInHospital { get; set; }

        [StringLength(70, MinimumLength = 1)]
        public string MedicationsTaking { get; set; }

        [Required]
        public bool AllergicToMedicationOrSomething { get; set; }

        [Required]
        public bool TreatedUnderLocalAnesthesia { get; set; }

        [Required]
        public bool HasBleedingDisorder { get; set; }

        [Required]
        public bool HasRadiationTherapy { get; set; }

        [Required]
        public bool HasInfectiousDisease { get; set; }

        [Required]
        public bool HadBloodTransfusion { get; set; }

        [StringLength(70, MinimumLength = 1)]
        public string TypeOfTransfusion { get; set; }
        public DateTime? DateOfTransfusion { get; set; }

        [Required]
        public bool HasAids { get; set; }

        [Required]
        public bool IsHivPositive { get; set; }

        [Required]
        public bool IsPregnant { get; set; }
        public DateTime? DeliveryDate { get; set; }

        [Required]
        public bool WantSixMonthTherapyMessage { get; set; }

        [Required]
        public bool IsAgreedToTreatment { get; set; }

        [UIControlType(nameof(UIControlTypeCodes.MultiSelect))]
        public virtual List<Disease> Diseases { get; } = new(); //M2M

        [UIDoNotGenerate]
        [ManyToOneRequired]
        [WithMany(nameof(Patient.PatientDocuments))]
        public virtual UserExtended Patient { get; set; } 
    }
}
