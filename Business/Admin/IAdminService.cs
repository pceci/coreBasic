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
        cRegla GetOneRegla(int id);

        List<cRegla> GetAllRegla();

        cRegla AddRegla(cRegla regla);
        cRegla EditRegla(int id, cRegla regla);

        void DeleteRegla(int id);

        List<cListaCheck> GetAllReglaPorNivel();
        List<int> GetAllIdReglasHijas(int pIdRegla, List<cRegla> pListaRegla);
        cUsuario GetOneUsuario(int id);
        List<cUsuario> GetAllUsuario();
        cUsuario AddUsuario(cUsuario usuario);
        cUsuario EditUsuario(int id, cUsuario usuario);
        void DeleteUsuario(int id);
    }
}