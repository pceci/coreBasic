using System.Collections.Generic;
using coreBasic.Entities;
using System.Linq;

namespace coreBasic.Business
{
    public class AdminService : IAdminService
    {
        public static List<cRol> DataSourceRol = new List<cRol>(new[] {
          new cRol() { id = 1, rol_Nombre = "Hola" },
          new cRol() { id = 2, rol_Nombre = "Mundo"},
          new cRol() { id = 3, rol_Nombre = "Lala" },
      });
        public cRol GetOneRol(int id) => DataSourceRol.Where(m => m.id == id).FirstOrDefault();

        public List<cRol> GetAllRol() { return DataSourceRol; }

        public cRol AddRol(cRol rol)
        {
            rol.id = DataSourceRol.Count() + 1;
            DataSourceRol.Add(rol);
            return rol;
        }
        public cRol EditRol(int id, cRol pRol)
        {
            if (id != pRol.id)
            {
                return null;
            }
            DataSourceRol.FirstOrDefault(x => x.id == id).rol_Nombre = pRol.rol_Nombre;
            return DataSourceRol.FirstOrDefault(x => x.id == id);
        }

        public void DeleteRol(int id)
        {
            DataSourceRol.RemoveAll(c => c.id == id);
        }
    }
}