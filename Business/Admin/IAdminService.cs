using System.Collections.Generic;
using coreBasic.Entities;

namespace coreBasic.Business
{
    public interface IAdminService
    {
        cRol GetOneRol(int id);

        List<cRol> GetAllRol();

        cRol AddRol(cRol rol);
        cRol EditRol(int id, cRol rol);

        void DeleteRol(int id);
    }
}