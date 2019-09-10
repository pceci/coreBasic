using Microsoft.AspNetCore.Mvc;
using coreBasic.Entities;
using System.Linq;
using coreBasic.Business;

namespace netCoreWorkshop.API
{
    [Route("/api/reglas")]
    [ApiController]
    public class ReglasApiController : ControllerBase
    {
        private readonly IAdminService adminService;

        public ReglasApiController(IAdminService adminService)
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
        [HttpPost]
        public IActionResult Create([FromBody]List<cReglaPorRol> reglasRol)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            regla = adminService.EditReglasRol(regla);

            return CreatedAtAction(nameof(Create), new { id = regla.id }, regla);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody]cRegla regla)
        {

            if (id != regla.id)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var current = adminService.EditRegla(id, regla);

            if (current == null)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}