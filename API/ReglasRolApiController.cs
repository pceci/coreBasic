using System.Linq;
using coreBasic.Business;
using coreBasic.Entities;
using Microsoft.AspNetCore.Mvc;

namespace netCoreWorkshop.API {
    [Route ("/api/reglas")]
    [ApiController]
    public class ReglasApiController : ControllerBase {
        private readonly IAdminService adminService;

        public ReglasApiController (IAdminService adminService) {
            this.adminService = adminService;
        }

        [HttpGet ("{id}")]
        public IActionResult Get (int id) {
            var obj = adminService.GetAllReglasRol (id);

            if (obj == null) {
                return NotFound ();
            }

            return Ok (obj);
        }
        [HttpPut ("{id}")]
        public IActionResult Edit (int id, [FromBody] List<cReglaPorRol> reglasRol) {
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }
            var current = adminService.EditReglasRol (id, reglasRol);
            if (current == null) {
                return NotFound ();
            }
            return NoContent ();
        }

    }
}