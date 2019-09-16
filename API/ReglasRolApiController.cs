using System.Linq;
using coreBasic.Business;
using coreBasic.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace netCoreWorkshop.API
{
    [Route("/api/reglasrol")]
    [ApiController]
    public class ReglasRolApiController : ControllerBase
    {
        private readonly IAdminService adminService;

        public ReglasRolApiController(IAdminService adminService)
        {
            this.adminService = adminService;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var obj = adminService.GetAllReglasRol(id);

            if (obj == null)
            {
                return NotFound();
            }

            return Ok(obj);
        }
        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody]List<cReglaPorRol> reglasRol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var current = adminService.EditReglasRol(id, reglasRol);
            if (!current)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}