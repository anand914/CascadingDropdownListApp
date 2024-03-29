using System.ComponentModel.DataAnnotations;

namespace CascadingDropdownListApp.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public int CountryID { get; set; }
        public int StateId { get; set; }
        public int CityId { get; set; }
    }
}
