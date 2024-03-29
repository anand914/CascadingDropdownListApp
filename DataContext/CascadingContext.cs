using CascadingDropdownListApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CascadingDropdownListApp.DataContext
{
    public class CascadingContext : DbContext
    {
        public CascadingContext(DbContextOptions<CascadingContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> State { get; set; }
        public DbSet<City> City { get; set; }
    }
}
