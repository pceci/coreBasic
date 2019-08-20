using System.ComponentModel.DataAnnotations;

namespace coreBasic.Entities
{
    public class cRol : IEntityBase
    {
        [Display(Name = "Código")]
        public int id { get { return rol_codRol; } set { rol_codRol = value; } }
        public int rol_codRol { get; set; }
        [Required(ErrorMessage="Nombre es obligatorio.")]
        [Display(Name = "Nombre")]
        public string rol_Nombre { get; set; }
    }
}