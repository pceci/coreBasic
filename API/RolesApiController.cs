using Microsoft.AspNetCore.Mvc;
using coreBasic.Entities;
using System.Linq;
using coreBasic.Business;
using Microsoft.AspNetCore.Authorization;

namespace netCoreWorkshop.API
{
    [Route("/api/roles")]
    [Authorize]
    [ApiController]
    public class RolesApiController : ControllerBase
    {
        private readonly IAdminService adminService;

        public RolesApiController(IAdminService adminService)
        {
            this.adminService = adminService;
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var obj = adminService.GetOneRol(id);

            if (obj == null)
            {
                return NotFound();
            }

            return Ok(obj);
        }

        [HttpGet]
        public IActionResult Get() => Ok(adminService.GetAllRol());
        // public IActionResult Get()
        // {
        //     return Ok(adminService.GetAllRol());
        // }
        [HttpPost]
        public IActionResult Create([FromBody]cRol rol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rol = adminService.AddRol(rol);

            return CreatedAtAction(nameof(Create), new { id = rol.id }, rol);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody]cRol rol)
        {

            if (id != rol.id)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentRol = adminService.EditRol(id, rol);

            if (currentRol == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            adminService.DeleteRol(id);
            return NoContent();
        }
    }
}