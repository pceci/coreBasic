using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using coreBasic.Entities;

namespace coreBasic.Codigo
{
    public class capaAdmin
    {
        public static bool spError(string err_Nombre, string err_Parameters, string err_Data, string err_HelpLink, string err_InnerException, string err_Message, string err_Source, string err_StackTrace, DateTime err_fecha, string err_tipo)
        {
            BaseDataAccess db = new BaseDataAccess(Helper.getConnectionStringSQL);
            List<SqlParameter> l = new List<SqlParameter>();
            l.Add(db.GetParameter("err_Nombre", err_Nombre));
            l.Add(db.GetParameter("err_Parameters", err_Parameters));
            l.Add(db.GetParameter("err_Data", err_Data));
            l.Add(db.GetParameter("err_HelpLink", err_HelpLink));
            l.Add(db.GetParameter("err_InnerException", err_InnerException));
            l.Add(db.GetParameter("err_Message", err_Message));
            l.Add(db.GetParameter("err_Source", err_Source));
            l.Add(db.GetParameter("err_StackTrace", err_StackTrace));
            l.Add(db.GetParameter("err_fecha", err_fecha));
            l.Add(db.GetParameter("err_tipo", err_tipo));
            int result = db.ExecuteNonQuery("LogRegistro.spError", l);
            return result > 0;
        }
        public static DataSet GestiónRol(int? rol_codRol, string rol_Nombre, string filtro, string accion)
        {
            BaseDataAccess db = new BaseDataAccess(Helper.getConnectionStringSQL);
            List<SqlParameter> l = new List<SqlParameter>();
            l.Add(db.GetParameter("rol_codRol", rol_codRol));
            l.Add(db.GetParameter("rol_Nombre", rol_Nombre));
            l.Add(db.GetParameter("filtro", filtro));
            l.Add(db.GetParameter("accion", accion));
            DataSet ds = db.GetDataSet("Seguridad.spGestionRol", l);
            return ds;
        }
        public static List<cRol> RecuperarTodasRoles(string pFiltro)
        {
            List<cRol> lista = new List<cRol>();
            DataSet dsResultado = GestiónRol(null, null, pFiltro, Constantes.cSQL_SELECT);
            if (dsResultado != null && dsResultado.Tables.Count > 0)
            {
                foreach (DataRow item in dsResultado.Tables[0].Rows)
                {
                    cRol o = ConvertToRol(item);
                    lista.Add(o);
                }
            }
            return lista;
        }
        public static int InsertarActualizarRol(int rol_codRol, string rol_Nombre)
        {
            string accion = rol_codRol == 0 ? Constantes.cSQL_INSERT : Constantes.cSQL_UPDATE;
            DataSet dsResultado = GestiónRol(rol_codRol, rol_Nombre, null, accion);
            int resultado = -1;
            if (rol_codRol == 0)
            {
                if (dsResultado != null && dsResultado.Tables.Count > 0)
                {
                    if (dsResultado.Tables[0].Rows[0]["rol_codRol"] != DBNull.Value)
                    {
                        resultado = Convert.ToInt32(dsResultado.Tables[0].Rows[0]["rol_codRol"]);
                    }
                }
            }
            else
            {
                resultado = rol_codRol;
            }
            return resultado;
        }
        public static cRol RecuperarRolPorId(int pIdRol)
        {
            DataSet dsResultado = GestiónRol(pIdRol, null, null, Constantes.cSQL_SELECT);
            if (dsResultado != null && dsResultado.Tables.Count > 0)
            {
                foreach (DataRow item in dsResultado.Tables[0].Rows)
                {
                    cRol o = ConvertToRol(item);
                    return o;
                }
            }
            return null;
        }
        public static void EliminarRol(int rol_codRol)
        {
            DataSet dsResultado = GestiónRol(rol_codRol, null, null, Constantes.cSQL_DELETE);
        }
        public static cRol ConvertToRol(DataRow pItem)
        {
            cRol o = new cRol();
            if (pItem.Table.Columns.Contains("rol_codRol") && pItem["rol_codRol"] != DBNull.Value)
            {
                o.rol_codRol = Convert.ToInt32(pItem["rol_codRol"]);
            }
            if (pItem.Table.Columns.Contains("rol_Nombre") && pItem["rol_Nombre"] != DBNull.Value)
            {
                o.rol_Nombre = pItem["rol_Nombre"].ToString();
            }
            return o;
        }
    }
}