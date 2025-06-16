using Microsoft.EntityFrameworkCore;
using Spiderly.Security.Entities;
using Spiderly.Security.Interfaces;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Attributes.EF;
using Spiderly.Shared.Attributes.EF.Translation;
using Spiderly.Shared.Attributes.EF.UI;
using Spiderly.Shared.BaseEntities;
using Spiderly.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduler.Business.Entities
{
    [DoNotAuthorize]
    [Index(nameof(Email), IsUnique = true)]
    public class UserExtended : BusinessObject<long>, IUser
    {
        [StringLength(100, MinimumLength = 3)]
        [BlobName]
        public string ProfilePictureBlobName { get; set; }

        [UIDoNotGenerate]
        [UIControlWidth("col-12")]
        [DisplayName]
        [CustomValidator("EmailAddress()")]
        [StringLength(70, MinimumLength = 5)]
        [Required]
        public string Email { get; set; }

        public DateTime? BirthDate { get; set; }

        public bool? HasLoggedInWithExternalProvider { get; set; }

        public bool? IsDisabled { get; set; }


        [WithMany(nameof(Gender.Users))]
        [SetNull]
        [UIControlType(nameof(UIControlTypeCodes.Dropdown))]
        public virtual Gender Gender { get; set; }

        

        [ExcludeServiceMethodsFromGeneration]
        public virtual List<Role> Roles { get; } = new(); // M2M

        public virtual List<Notification> Notifications { get; } = new(); // M2M

        public virtual List<Appointment> DoctorAppointments { get; } = new();

        public virtual List<Appointment> PatientAppointments { get; } = new();

        public virtual List<PatientDocument> PatientDocuments { get; } = new();

    }
}
