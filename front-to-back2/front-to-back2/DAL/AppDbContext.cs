using front_to_back2.Models;
using Microsoft.EntityFrameworkCore;

namespace front_to_back2.DAL
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<DoctorFindComponent> DoctorFindComponents { get; set; }
        public DbSet<DepartamentServicesComponent> DepartamentServicesComponents { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductComponent> ProductComponents { get; set; }
    }
}
