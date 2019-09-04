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
            rol.id = capaAdmin.InsertarActualizarRol(rol.rol_codRol, rol.rol_Nombre);
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
            capaAdmin.InsertarActualizarRol(rol.rol_codRol, rol.rol_Nombre);
            if (rol.id < 0)
                return null;
            return rol;
        }

        public void DeleteRol(int id)
        {
            capaAdmin.EliminarRol(id);
        }
        public cRegla GetOneRegla(int id)
        {
            return capaAdmin.RecuperarReglaPorId(id);
        }
        public List<cRegla> GetAllRegla()
        {
            return capaAdmin.RecuperarTodasReglas(string.Empty);
        }
        public cRegla AddRegla(cRegla regla)
        {
            regla.rgl_codRegla = capaAdmin.InsertarActualizarRegla(regla.rgl_codRegla, regla.rgl_Descripcion.Trim(), regla.rgl_PalabraClave.Trim().ToLower(), regla.rgl_IsAgregarSoporta, regla.rgl_IsEditarSoporta, regla.rgl_IsEliminarSoporta, regla.rgl_codReglaPadre);
            if (regla.rgl_codRegla < 0)
                return null;
            return regla;
        }
        public cRegla EditRegla(int id, cRegla regla)
        {
            if (id != regla.rgl_codRegla)
            {
                return null;
            }
            regla.rgl_codRegla = capaAdmin.InsertarActualizarRegla(regla.rgl_codRegla, regla.rgl_Descripcion.Trim(), regla.rgl_PalabraClave.Trim().ToLower(), regla.rgl_IsAgregarSoporta, regla.rgl_IsEditarSoporta, regla.rgl_IsEliminarSoporta, regla.rgl_codReglaPadre);
            if (regla.rgl_codRegla < 0)
                return null;
            return regla;
        }

        public void DeleteRegla(int id)
        {
            capaAdmin.EliminarRegla(id);
        }
        public List<cListaCheck> GetAllReglaPorNivel()
        {
            return capaAdmin.RecuperarTodasReglasPorNivel();
        }
        public List<int> GetAllIdReglasHijas(int pIdRegla, List<cRegla> pListaRegla)
        {
            return capaAdmin.RecuperarTodosIdReglasHijas(pIdRegla, pListaRegla);
        }
        public cUsuario GetOneUsuario(int id)
        {
            return capaAdmin.RecuperarUsuarioPorId(id);
        }
        public List<cUsuario> GetAllUsuario()
        {
            return capaAdmin.RecuperarTodosUsuarios(string.Empty);
        }
        public cUsuario AddUsuario(cUsuario usuario)
        {
            usuario.usu_codigo = capaAdmin.InsertarActualizarUsuario(usuario.usu_codigo, usuario.usu_codRol, usuario.usu_codCliente, usuario.usu_nombre, usuario.usu_apellido, usuario.usu_mail, usuario.usu_login, usuario.usu_pswDesencriptado, usuario.usu_observacion, null);
            if (usuario.usu_codigo < 0)
                return null;
            return usuario;
        }
        public cUsuario EditUsuario(int id, cUsuario usuario)
        {
            if (id != usuario.id)
            {
                return null;
            }
            usuario.usu_codigo = capaAdmin.InsertarActualizarUsuario(usuario.usu_codigo, usuario.usu_codRol, usuario.usu_codCliente, usuario.usu_nombre, usuario.usu_apellido, usuario.usu_mail, usuario.usu_login, usuario.usu_pswDesencriptado, usuario.usu_observacion, null);
            if (usuario.usu_codigo < 0)
                return null;
            return usuario;
        }
        public void DeleteUsuario(int id)
        {
            capaAdmin.EliminarUsuario(id);
        }
    }
}