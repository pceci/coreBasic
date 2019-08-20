using System.Collections.Generic;
using coreBasic.Entities;
using System.Linq;
using coreBasic.Codigo;

namespace coreBasic.Business
{
    public class AdminServiceSql : IAdminService
    {
        public cRol GetOneRol(int id) => capaAdmin.RecuperarRolPorId(id);

        public List<cRol> GetAllRol() { return capaAdmin.RecuperarTodasRoles(""); }

        public cRol AddRol(cRol rol)
        {
            rol.id = capaAdmin.InsertarActualizarRol(rol.rol_codRol,rol.rol_Nombre);
            if (rol.id < 0)
               return null;
            return rol;
        }
        public cRol EditRol(int id, cRol rol)
        {
            if (id != rol.id)
            {
                return null;
            }
            capaAdmin.InsertarActualizarRol(rol.rol_codRol,rol.rol_Nombre);
            if (rol.id < 0)
               return null;
            return rol;
        }

        public void DeleteRol(int id)
        {
           capaAdmin.EliminarRol(id);
        }
    }
}