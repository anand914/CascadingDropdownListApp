using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CascadingDropdownListApp.Models
{
    public class State
    {
        [Key]
        public int S_Id { get; set; }
        public string? StateName { get; set; }
        [ForeignKey("Country")]
        public int CountryId { get; set; }
        public Country Country { get; set; } = default!;
    }
}
