using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CascadingDropdownListApp.Models
{
    public class City
    {
        [Key]
        public int DId { get; set; }
        public string? CityName { get; set; }
        [ForeignKey("State")]
        public int StateId { get; set; }
        public State State { get; set; } = default!;
    }
}
