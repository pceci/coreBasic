using System;
using System.IO;
using System.Reflection;

namespace coreBasic.Codigo
{
    public class AccesoDisco
    {
        public static bool EliminarArchivo(string pRutaYNombreArchivo)
        {
            try
            {
                File.Delete(pRutaYNombreArchivo);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(MethodBase.GetCurrentMethod(), ex, DateTime.Now, pRutaYNombreArchivo);
            }
            return false;
        }
        public static bool CopiarArchivo(string pRutaYNombreArchivoOrigen, string pRutaYNombreArchivoDestino)
        {
            try
            {
                File.Copy(pRutaYNombreArchivoOrigen, pRutaYNombreArchivoDestino);
                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(MethodBase.GetCurrentMethod(), ex, DateTime.Now, pRutaYNombreArchivoOrigen, pRutaYNombreArchivoDestino);
            }
            return false;
        }
    }
}