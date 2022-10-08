using front_to_back2.DAL;
using front_to_back2.ViewModels.Departament;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace front_to_back2.Controllers
{
    public class DepartamentController : Controller
    {
        private readonly AppDbContext _appDbContext;

        public DepartamentController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<IActionResult> Index()
        {
            var departamentServicesComponent = await _appDbContext.DepartamentServicesComponents.ToListAsync();

            var model = new DepartamentIndexViewModel
            {
                DepartamentServicesComponents = departamentServicesComponent
            };
            return View(model);
        }
    }
}
