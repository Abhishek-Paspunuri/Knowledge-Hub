using Microsoft.AspNetCore.Identity;

namespace Test.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        public string? Name { get; set; }

        [PersonalData]
        public DateTime? Password { get; set; }
        
        [PersonalData]
        public bool? isActive { get; set; }

        [PersonalData]
        public bool? isAdmin { get; set; }

        [PersonalData]
        public string? profileName { get; set; }

        [PersonalData]
        public string? appliedFor { get; set; }
    }
}
