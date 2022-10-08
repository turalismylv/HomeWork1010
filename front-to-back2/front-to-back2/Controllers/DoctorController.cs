using front_to_back2.DAL;
using front_to_back2.ViewModels.Doctor;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace front_to_back2.Controllers
{
    public class DoctorController : Controller
    {
        private readonly AppDbContext _appDbContext;

        public DoctorController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<IActionResult> Index()
        {
            var doctorFindComponent = await _appDbContext.DoctorFindComponents.ToListAsync();
            var model = new DoctorIndexViewModel
            {
                DoctorFindComponents = doctorFindComponent,
            };
            return View(model);
        }
    }
}
