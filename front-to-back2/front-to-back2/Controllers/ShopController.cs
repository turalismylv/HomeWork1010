using front_to_back2.DAL;
using front_to_back2.ViewModels.Shop;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace front_to_back2.Controllers
{
    public class ShopController : Controller
    {
        private readonly AppDbContext _appDbContext;

        public ShopController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<IActionResult> Index()
        {
            var product=await _appDbContext.Products.Include(x=>x.ProductComponents).ToListAsync();
            var model = new ShopIndexViewModel
            {
                Products = product
            };
            return View(model);
        }
    }
}
