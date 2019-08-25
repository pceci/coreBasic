using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
//using Microsoft.AspNetCore.Authorization;

namespace coreBasic.Controllers
{
    public class HomeController : Controller
    {
        //[MyAuthorize(MyClaimTypes.Permiso, MyClaimValueTypes.Escribir, MyPermission.Empleado)]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}