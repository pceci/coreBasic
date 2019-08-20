using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using coreBasic.Business;
using coreBasic.Entities;

namespace coreBasic.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAdminService adminService;

        public AdminController(IAdminService pAdminService)
        {
            this.adminService = pAdminService;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpGet]
        public IActionResult RolIndex()
        {
            return View(adminService.GetAllRol());
        }

        [HttpGet]
        public IActionResult RolDetails(int id)
        {
            var oRol = adminService.GetOneRol(id);

            if (oRol == null)
            {
                return NotFound();
            }

            return View(oRol);
        }

        [HttpGet]
        public IActionResult RolCreate()
        {
            return View(new cRol());
        }

        [HttpPost]
        public IActionResult RolCreate(cRol pRol)
        {
            if (ModelState.IsValid)
            {
                adminService.AddRol(pRol);

                return RedirectToAction("RolIndex");
            }

            return View(pRol);
        }


        [HttpGet]
        public IActionResult RolEdit(int id)
        {
            var oRol = adminService.GetOneRol(id);

            if (oRol == null)
            {
                return NotFound();
            }
            
            return View(oRol);
        }

        [HttpPost]
        public IActionResult RolEdit(int id, cRol pRol)
        {
            if (ModelState.IsValid)
            {
                var updatedRol = adminService.EditRol(id, pRol);

                if (updatedRol == null)
                {
                    return NotFound();
                }
             
                return RedirectToAction("RolIndex");
            }

            return View(pRol);
        }


        [HttpGet]
        public IActionResult RolDelete(int id)
        {   
            var oRol = adminService.GetOneRol(id);

            if (oRol == null)
            {
                return NotFound();
            }

            return View(oRol);
        }

        [HttpPost]//, ActionName("Delete")
        public IActionResult RolDeleteConfirmed(int id)
        {
            adminService.DeleteRol(id);

            return RedirectToAction("RolIndex");
        }
    }
}