using System.ComponentModel.DataAnnotations;

namespace CascadingDropdownListApp.Models
{
    public class Country
    {
        [Key]
        public int CId { get; set; }
        public string CountryName { get; set; } = default!;
    }
}
