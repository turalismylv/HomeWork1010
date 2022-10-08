using front_to_back2.DAL;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(x => x.UseSqlServer(connectionString));


var app = builder.Build();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=doctor}/{action=index}"
    );
app.UseStaticFiles();
app.Run();

