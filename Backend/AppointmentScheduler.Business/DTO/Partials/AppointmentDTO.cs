using Spiderly.Shared.Attributes.Entity.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduler.Business.DTO
{
    public partial class AppointmentDTO
    {

        [UIDoNotGenerate]
        public string DoctorColor { get; set; }
    }
}
