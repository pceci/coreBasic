using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace coreBasic.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}