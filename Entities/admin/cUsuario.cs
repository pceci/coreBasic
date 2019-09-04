using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace coreBasic.Entities
{
    public class cUsuario:IEntityBase
    {
        public int id { get { return usu_codigo; } set { usu_codigo = value; } }
        public int usu_codigo { get; set; }
        public int usu_codRol { get; set; }
        public int? usu_codCliente { get; set; }
        public string rol_Nombre { get; set; }
        public string NombreYapellido { get; set; }
        public string usu_nombre { get; set; }
        public string usu_apellido { get; set; }
        public string usu_login { get; set; }
        public string usu_mail { get; set; }
        public string usu_pswDesencriptado { get; set; }
        public string usu_observacion { get; set; }
        public int usu_estado { get; set; }
        public string usu_estadoToString { get; set; }
        public string cli_nombre { get; set; }
        public List<string> listaPermisoDenegados { get; set; }
    }
}