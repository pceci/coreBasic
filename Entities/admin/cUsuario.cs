using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace coreBasic.Entities
{
    public class cUsuario : IEntityBase
    {
        [Display(Name = "Código")]
        public int id { get { return usu_codigo; } set { usu_codigo = value; } }
        public int usu_codigo { get; set; }
        public int usu_codRol { get; set; }
        public int? usu_codCliente { get; set; }
        public int rol_codRol { get; set; }
        [Display(Name = "Rol")]
        public string rol_Nombre { get; set; }
        public string NombreYapellido { get; set; }
        [Display(Name = "Nombre")]
        public string usu_nombre { get; set; }
        [Display(Name = "Apellido")]
        public string usu_apellido { get; set; }
        [Display(Name = "Login")]
        public string usu_login { get; set; }
        [Display(Name = "Mail")]
        [Required(ErrorMessage = "Email es obligatorio.")]
        public string usu_mail { get; set; }
        public string usu_pswDesencriptado { get; set; }
        public string usu_observacion { get; set; }
        [Display(Name = "Estado")]
        public int usu_estado { get; set; }
        [Display(Name = "Estado")]
        public string usu_estadoToString { get; set; }
        public string cli_nombre { get; set; }
        public List<string> listaPermisoDenegados { get; set; }
    }
}