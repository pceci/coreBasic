var isPostBack = false;
var listaArbolParaCombo = null;
var varIsAgregar = true;
var varIsEliminar = true;
var varIsEditar = true;

jQuery(document).ready(function () {
    // if (typeof (listaArbolParaComboLoad) != 'undefined') {
    //     listaArbolParaCombo = eval('(' + listaArbolParaComboLoad + ')');
    //     CargarCombo();
    // } else {
    //     PageMethods.CargarArbolCombo(OnCallBackCargarArbolCombo, OnFail);
    // }
    if (listaArbolParaCombo == null) {
        listaArbolParaCombo = eval('(' + $('#hiddenListaTodasReglasPorNivel').val() + ')');
        if (typeof listaArbolParaCombo == 'undefined') {
            listaArbolParaCombo = null;
        }
    }
    CargarCombo();
    isPostBack = true;

});
function clickCerrarMensajes() {
    alertGenericClose();
}
function LimpiarControlesSinComboReglaElegir() {
    $("#txtNombreReglaInput").val('');
    $("#txtPalabraClaveInput").val('');
    $('#txtPalabraClaveInput').prop( "disabled", false );
    $("#CheckBoxSoportadasAgregar").prop('checked', false);
    $("#CheckBoxSoportadasEditar").prop('checked', false);
    $("#CheckBoxSoportadasEliminar").prop('checked', false);
    $("#comboReglasContenidas").prop('selectedIndex',  0);
}
function CargarCombo() {
    var strHTMLcombo = '';
    var strHTMLcomboInicioContenida = '<select id="comboReglasContenidas"   class="form-control"  >';
    var strHTMLcomboInicioElegir = '<select id="comboReglasElegir"  class="form-control"  onchange="clickComboElegir()">';
    if (varIsAgregar) {
        strHTMLcomboInicioElegir += "<option value=\'" + "0" + "\'>";
        strHTMLcomboInicioElegir += "<div >" + "<<( Nueva Regla )>>" + "</div>";
        strHTMLcomboInicioElegir += "</option>";
    }
    if (listaArbolParaCombo.length > 0) {
        for (var i = 0; i < listaArbolParaCombo.length; i++) {

            if (!listaArbolParaCombo[i].isGraficada) {
                strHTMLcombo += "<option value=\'" + listaArbolParaCombo[i].id + "\'>";
                strHTMLcombo += "<div >" + listaArbolParaCombo[i].descripcion + "</div>";
                strHTMLcombo += "</option>";
                listaArbolParaCombo[i].isGraficada = true;
                strHTMLcombo += RecuperarHTMLNodosHijosCombo(listaArbolParaCombo[i].listaIdHijas);
            }
        }
    }
    strHTMLcombo += '</select>';
    if (varIsAgregar) {
        document.getElementById('divCombo').innerHTML = strHTMLcomboInicioContenida + strHTMLcombo;
        $("#btnEliminar").prop( "disabled", true );
    } else {
        document.getElementById('divCombo').innerHTML = "<select id=/'comboReglasContenidas/' class=/'form-control/'  >" + obtenerRaizOptiom() + "</select>";
        RecuperarReglaRaiz();
        $("#btnGuardar").prop( "disabled", true );
        $("#btnEliminar").prop( "disabled", true );
    }
    document.getElementById('divComboRegla').innerHTML = strHTMLcomboInicioElegir + strHTMLcombo;

}
function clickComboElegir() {
    alertGenericClose();
    LimpiarControlesSinComboReglaElegir();
    var idReglaSeleccionada = $("#comboReglasElegir").val();
    var CodigoPadreReglaSeleccionada = cargarComboContenidoModificar(idReglaSeleccionada);
    for (var i = 0; i < document.getElementById('comboReglasContenidas').length; i++) {
        if (document.getElementById('comboReglasContenidas')[i].value == CodigoPadreReglaSeleccionada) {
            document.getElementById('comboReglasContenidas')[i].selected = true;
            break;
        }
    }
    if (idReglaSeleccionada > 0) {
        RecuperarReglaPorId(idReglaSeleccionada);
    } else {
        //        $('#txtPalabraClaveInput').removeAttr('disabled');
        $("#btnEliminar").prop( "disabled", true );
    }
}
function OnCallBackRecuperarReglaPorId(args) {
    //    var fgg = args;
    if (args != null) {
        $("#txtNombreReglaInput").val(args.descripcion);
        $("#txtPalabraClaveInput").val(args.palabra);
        $('#txtPalabraClaveInput').prop( "disabled", true );
        if (args.checkAgregar == 0) {
            $("#CheckBoxSoportadasAgregar").prop('checked', false);
        } else {
            $("#CheckBoxSoportadasAgregar").prop('checked', true);
        }
        if (args.checkEditar == 0) {
            $("#CheckBoxSoportadasEditar").prop('checked', false);
        } else {
            $("#CheckBoxSoportadasEditar").prop('checked', true);
        }
        if (args.checkEliminar == 0) {
            $("#CheckBoxSoportadasEliminar").prop('checked', false);
        } else {
            $("#CheckBoxSoportadasEliminar").prop('checked', true);
        }
        if (varIsEliminar) {
            if (args.listaIdHijas.length > 0) {
                $("#btnEliminar").prop( "disabled", true );
            } else {
                $("#btnEliminar").prop( "disabled", false );
            }
        } else {
            $("#btnEliminar").prop( "disabled", true );
        }
        if (varIsEditar) {
            $("#btnGuardar").prop( "disabled", false );
        } else {
            $("#btnGuardar").prop( "disabled", true );
        }
    }
}
function cargarComboContenidoModificar(pIdRegla) {
    var isRaiz = false;
    var CodigoPadre = 0;
    for (var i = 0; i < listaArbolParaCombo.length; i++) {
        if (pIdRegla == listaArbolParaCombo[i].id) {
            if (listaArbolParaCombo[i].idPadreRegla == null) {
                isRaiz = true;
                break;
            }
        }
    }

    var strHTMLcombo = '';
    var strHTMLcomboInicioContenida = '<select id="comboReglasContenidas"  class="form-control" >';
    if (!isRaiz) {
        for (var i = 0; i < listaArbolParaCombo.length; i++) {
            listaArbolParaCombo[i].isGraficada = false;
            if (listaArbolParaCombo[i].id == pIdRegla) {
                CodigoPadre = listaArbolParaCombo[i].idPadreRegla;
            }

        }
        if (listaArbolParaCombo.length > 0) {
            for (var i = 0; i < listaArbolParaCombo.length; i++) {
                if (!listaArbolParaCombo[i].isGraficada) {
                    if (listaArbolParaCombo[i].id != pIdRegla) {
                        strHTMLcombo += "<option value=\'" + listaArbolParaCombo[i].id + "\'>";
                        strHTMLcombo += "<div >" + listaArbolParaCombo[i].descripcion + "</div>";
                        strHTMLcombo += "</option>";
                        listaArbolParaCombo[i].isGraficada = true;
                        strHTMLcombo += RecuperarHTMLNodosHijosComboModificar(listaArbolParaCombo[i].listaIdHijas, pIdRegla);
                    } else {
                        listaArbolParaCombo[i].isGraficada = true;
                        MarcarComoGraficadas(listaArbolParaCombo[i].listaIdHijas);
                    }
                }
            }
        }
    } else {
        strHTMLcombo += obtenerRaizOptiom();
    }
    strHTMLcombo += '</select>';
    document.getElementById('divCombo').innerHTML = strHTMLcomboInicioContenida + strHTMLcombo;

    return CodigoPadre;
}

function obtenerRaizOptiom() {
    var strHTMLcombo = "";
    strHTMLcombo += "<option  value=\'" + "0" + "\'>";
    strHTMLcombo += "<div >" + "--- Root Node ---" + "</div>";
    strHTMLcombo += "</option>";
    return strHTMLcombo;
}


function MarcarComoGraficadas(pListaHijas) {
    for (var i = 0; i < pListaHijas.length; i++) {
        for (var x = 0; x < listaArbolParaCombo.length; x++) {
            if (!listaArbolParaCombo[x].isGraficada) {
                if (pListaHijas[i] == listaArbolParaCombo[x].id) {
                    listaArbolParaCombo[x].isGraficada = true;
                    MarcarComoGraficadas(listaArbolParaCombo[x].listaIdHijas);
                }
            }
        }
    }
}

function RecuperarHTMLNodosHijosComboModificar(pListaHijas, pIdRegla) {
    var strTextoCompleto = '';
    for (var i = 0; i < pListaHijas.length; i++) {
        for (var x = 0; x < listaArbolParaCombo.length; x++) {
            if (!listaArbolParaCombo[x].isGraficada) {

                if (pListaHijas[i] == listaArbolParaCombo[x].id) {
                    if (pIdRegla != pListaHijas[i]) {
                        strTextoCompleto += "<option value=\'" + listaArbolParaCombo[x].id + "\'";
                        strTextoCompleto += "<div>";
                        for (var xy = 0; xy < listaArbolParaCombo[x].Nivel; xy++) {
                            strTextoCompleto += "&nbsp; &nbsp;"
                        }
                        strTextoCompleto += listaArbolParaCombo[x].descripcion + "</div>";
                        strTextoCompleto += "</option>";
                        listaArbolParaCombo[x].isGraficada = true;
                        strTextoCompleto += RecuperarHTMLNodosHijosComboModificar(listaArbolParaCombo[x].listaIdHijas, pIdRegla);
                    } else {
                        listaArbolParaCombo[x].isGraficada = true;
                        MarcarComoGraficadas(listaArbolParaCombo[x].listaIdHijas);
                    }
                }

            }
        }
    }
    return strTextoCompleto;
}

function RecuperarHTMLNodosHijosCombo(pListaHijas) {
    var strTextoCompleto = '';
    for (var i = 0; i < pListaHijas.length; i++) {
        for (var x = 0; x < listaArbolParaCombo.length; x++) {
            if (!listaArbolParaCombo[x].isGraficada) {
                if (pListaHijas[i] == listaArbolParaCombo[x].id) {
                    strTextoCompleto += "<option value=\'" + listaArbolParaCombo[x].id + "\'";
                    strTextoCompleto += "<div >";
                    for (var xy = 0; xy < listaArbolParaCombo[x].Nivel; xy++) {
                        strTextoCompleto += " &nbsp; &nbsp;"
                    }
                    strTextoCompleto += listaArbolParaCombo[x].descripcion + "</div>";
                    strTextoCompleto += "</option>";
                    listaArbolParaCombo[x].isGraficada = true;
                    strTextoCompleto += RecuperarHTMLNodosHijosCombo(listaArbolParaCombo[x].listaIdHijas);
                }
            }
        }
    }
    return strTextoCompleto;
}

function clikGuardar() {
    var idReglaSeleccionada = $("#comboReglasElegir").val();
    if (idReglaSeleccionada == 0) {
        // Es nueva la regla
        ValidarRegla();
    } else {
        // Es una regla existente
        if (varIsEditar) {
            ValidarReglaParaModificar(idReglaSeleccionada);
        } else {
            alertDanger('No tiene permiso para modificar');
        }
    }
    return false;
}
function ValidarReglaParaModificar(pIdRegla) {
    var strHtmlMensaje = '';
    var NombreRegla = $("#txtNombreReglaInput").val();
    if (NombreRegla == '') {
        strHtmlMensaje += "<p>" + "Descripción es campo requerido" + "</p>";
    }
    if ($("#comboReglasContenidas").val() == null) {
        strHtmlMensaje += "<p>" + "No hay regla raiz" + "</p>";
    }
    if (strHtmlMensaje != '') {
        alertDanger(strHtmlMensaje);
    } else {
        IsNombreOPalabraNoSeRepite(pIdRegla, String($("#txtNombreReglaInput").val()), String($("#txtPalabraClaveInput").val()));
    }
}
function OnCallBackIsNombreOPalabraNoSeRepiteModificar(args) {
    var strHtmlMensaje = '';
    if (!args[0]) {
        strHtmlMensaje += "<p>" + "Descripción no puede repetirse" + "</p>";
    }
    if (strHtmlMensaje != '') {
        alertDanger(strHtmlMensaje);
    } else {
        alertGenericClose();
        ActualizarRegla($("#comboReglasElegir").val(), $("#txtNombreReglaInput").val(), String($("#txtPalabraClaveInput").val()), $("#CheckBoxSoportadasAgregar").is(':checked'), $("#CheckBoxSoportadasEditar").is(':checked'), $("#CheckBoxSoportadasEliminar").is(':checked'), $("#comboReglasContenidas").val());
    }

}
function OnCallBackActualizarRegla(args) {
    if (args) {
        LimpiarControlesSinComboReglaElegir();
        CargarArbolCombo();
    }
    else {
        var strHtmlMensaje = '';
        strHtmlMensaje += "<p>" + "No se pudo actualizar la regla en el sistema" + "</p>";
        alertDanger(strHtmlMensaje);
    }
}
function OnFailActualizarRegla(ex) {
    $('#txtPalabraClaveInput').removeAttr('disabled');
    alertDanger(String(ex));
}
function ValidarRegla() {
    var strHtmlMensaje = '';
    var er = new RegExp(/\s/);
    var palaClave = $("#txtPalabraClaveInput").val();
    if (palaClave != '') {
        if (er.test(palaClave)) {
            strHtmlMensaje += "<p>" + "Palabra clave no tiene que tener espacio en blanco" + "</p>";
        }
    } else {
        strHtmlMensaje += "<p>" + "Palabra clave es campo requerido" + "</p>";
    }
    var NombreRegla = $("#txtNombreReglaInput").val();
    if (NombreRegla == '') {
        strHtmlMensaje += "<p>" + "Descripción es campo requerido" + "</p>";
    }
    if ($("#comboReglasContenidas").val() == null) {
        strHtmlMensaje += "<p>" + "No hay regla raiz" + "</p>";
    }

    if (strHtmlMensaje != '') {
        alertDanger(strHtmlMensaje);
    } else {
        IsNombreOPalabraNoSeRepite(0, String($("#txtNombreReglaInput").val()), String($("#txtPalabraClaveInput").val()));
    }
}

function OnCallBackIsNombreOPalabraNoSeRepite(args) {
    var strHtmlMensaje = '';
    if (!args[0]) {
        strHtmlMensaje += "<p>" + "Descripción no puede repetirse" + "</p>";
    }
    if (!args[1]) {
        strHtmlMensaje += "<p>" + "Palabra clave no puede repetirse" + "</p>";
    }
    if (strHtmlMensaje != '') {
        alertDanger(strHtmlMensaje);
    } else {
        alertGenericClose();
        InsertarRegla($("#txtNombreReglaInput").val(), $("#txtPalabraClaveInput").val(), $("#CheckBoxSoportadasAgregar").is(':checked'), $("#CheckBoxSoportadasEditar").is(':checked'), $("#CheckBoxSoportadasEliminar").is(':checked'), $("#comboReglasContenidas").val());
    }
}
function OnCallBackInsertarRegla(args) {
    if (args) {
        LimpiarControlesSinComboReglaElegir();
        CargarArbolCombo();
    }
    else {
        var strHtmlMensaje = '';
        strHtmlMensaje += "<p>" + "No se pudo grabar en el sistema" + "</p>";
        alertDanger(strHtmlMensaje);
    }
}
function OnCallBackCargarArbolCombo(args) {
    listaArbolParaCombo = eval('(' + args + ')');
    CargarCombo();
}
function clikEliminar() {
    $('#myModalEliminar').modal();
  /*  if (varIsEliminar) {
        if (confirm('¿Desea eliminar la regla?')) {
            EliminarRegla($("#comboReglasElegir").val());
        }
    } else {
        alert('No tiene permiso de eliminar regla');
    }*/
    return false;
}
function onclickEliminarRegla() {
    EliminarRegla($("#comboReglasElegir").val());
    return false;
}
function OnCallBackEliminarRegla(args) {
    if (args) {
        LimpiarControlesSinComboReglaElegir();
        CargarArbolCombo();
    } else {
        alertDanger('No se pudo eliminar');
    }
}
