var listaReglasRol = null;

jQuery(document).ready(function () {

    if (listaReglasRol == null) {
        listaReglasRol = eval('(' + $('#hiddenListaTodasReglasPorNivel').val() + ')');
        if (typeof listaReglasRol == 'undefined') {
            listaReglasRol = null;
        }
    }
    CargarArbolEnInicio();


});

function CargarArbolEnInicio() {

    if (listaReglasRol != null && listaReglasRol.length > 0) {
        var strTexto = '<table class=\'table table-striped\'><thead><tr>';
        strTexto += '<th>Reglas</th> <th><div class=\'texto-vertical\'>Activa</div></th>';
        strTexto += '<th><div class="texto-vertical">Agregar</div></th>';
        strTexto += '<th><div class="texto-vertical">Editar</div></th>';
        strTexto += '<th><div class="texto-vertical">Eliminar</div></th>';
        strTexto += '<th> Clave</th></tr></thead>';
        strTexto += '<tbody>';
        for (var xRaiz = 0; xRaiz < listaReglasRol.length; xRaiz++) {
            if (listaReglasRol[xRaiz].idPadreRegla == null) {
                var l_raiz = [];
                l_raiz.push(listaReglasRol[xRaiz].id);
                strTexto += GraficarNodosHijos(l_raiz);
            }
        }
        strTexto += '</tbody>';
        strTexto += "</table>";
        document.getElementById('divSectorArbol').innerHTML = strTexto;
    }
    else {
        // hacer algo cuando no se encuetra reglas para el rol
        var strTexto = '<table class=\'table table-striped\'><thead><tr>';
        strTexto += '<th>Reglas</th> <th><div class=\'texto-vertical\'>Activa</div></th>';
        strTexto += '<th><div class="texto-vertical">Agregar</div></th>';
        strTexto += '<th><div class="texto-vertical">Editar</div></th>';
        strTexto += '<th><div class="texto-vertical">Eliminar</div></th>';
        strTexto += '<th> Clave</th></tr></thead>';
        strTexto += "</table>";
        document.getElementById('divSectorArbol').innerHTML = strTexto;
    }
}

function GraficarNodosHijos(pListaHijas) {

    var strTextoCompleto = '';
    for (var i = 0; i < pListaHijas.length; i++) {

        for (var x = 0; x < listaReglasRol.length; x++) {

            if (String(pListaHijas[i]) == String(listaReglasRol[x].id)) {
                if (!listaReglasRol[x].isGraficada) {

                    var NivelCss = listaReglasRol[x].Nivel;
                    var strFila = "<tr id=\'fila_" + String(listaReglasRol[x].id) + "\'><td>";
                    strFila += "<span style=\'margin-left: " + String(NivelCss) + "em\'></span>";
                    if (listaReglasRol[x].listaIdHijas.length > 0) {
                        // strFila += "<div id=\'divImgBoton_" + String(listaReglasRol[x].id) + "\' style=\'margin-left: " + String(NivelCss) + "px\' class=\'cssDivImagenContraer\'  onclick=\'ExpandirOContraerNodo(this)\'> </div>";
                        // NivelCss = NivelCss + 12;
                        strFila += '<span id=\'divImgBoton_' + String(listaReglasRol[x].id) + '\' class="oi oi-minus oi-reglarol" title="icon name" aria-hidden="true"  onclick=\'ExpandirOContraerNodo(this)\'></span>';
                    }
                    strFila += "<span id=\'divImg_" + String(listaReglasRol[x].id) + "\'>" + listaReglasRol[x].descripcion + "</span></td>";

                    strFila += "<td ><input id=\'chkActivar_" + String(listaReglasRol[x].id) + "\' type=\'checkbox\' onClick=\'checkAll(this)\' /></td>";

                    if (listaReglasRol[x].checkAgregar == -1) {
                        strFila += "<td > </td>";
                    } else if (listaReglasRol[x].checkAgregar == 0) {
                        strFila += "<td ><input id=\'chkAgregar_" + String(listaReglasRol[x].id) + "\' type='checkbox\' onClick=\'checkAll(this)\' /></td>";
                    }

                    if (listaReglasRol[x].checkEditar == -1) {
                        strFila += "<td ></td>";
                    } else if (listaReglasRol[x].checkEditar == 0) {
                        strFila += "<td ><input id=\'chkEditar_" + String(listaReglasRol[x].id) + "\' type='checkbox\' onClick=\'checkAll(this)\' /></td>";
                    }
                    if (listaReglasRol[x].checkEliminar == -1) {
                        strFila += "<td ></td>";
                    } else if (listaReglasRol[x].checkEliminar == 0) {
                        strFila += "<td ><input id=\'chkEliminar_" + String(listaReglasRol[x].id) + "\' type='checkbox\' onClick=\'checkAll(this)\' /> </td>";
                    }
                    strFila += "<td >" + listaReglasRol[x].palabra + "</td>";
                    strFila += "</tr>";

                    strTextoCompleto += strFila;
                    listaReglasRol[x].isGraficada = true;
                    strTextoCompleto += GraficarNodosHijos(listaReglasRol[x].listaIdHijas);
                }
                break;
            }
        }

    }
    return strTextoCompleto;
}
function ExpandirOContraerNodo(pObj) {
    var lis = pObj.id.split('_');
    var listaRecorrido = [];

    listaRecorrido = BuscarHijos(parseInt(lis[1]));

    // var strCss = '';
    var strCssModificar = '';

    // strCss = document.getElementById("divImgBoton_" + String(lis[1])).className; // = 'cssDivImagenContraer';
    var strDisplay = '';
    if ($("#divImgBoton_" + String(lis[1])).hasClass("oi-plus")) {
        strDisplay = '';
        $("#divImgBoton_" + String(lis[1])).removeClass("oi-plus");
        $("#divImgBoton_" + String(lis[1])).addClass("oi-minus");
        strCssModificar = 'oi-minus';
    }
    else {
        strDisplay = 'none';
        $("#divImgBoton_" + String(lis[1])).removeClass("oi-minus");
        $("#divImgBoton_" + String(lis[1])).addClass("oi-plus");
        strCssModificar = 'oi-plus';
    }

    for (var i = 0; i < listaRecorrido.length; i++) {
        document.getElementById("fila_" + String(listaRecorrido[i])).style.display = strDisplay;
        ExpandirOContraerNodoPorIdPadre(listaRecorrido[i], strDisplay, strCssModificar);
    }
}
function ExpandirOContraerNodoPorIdPadre(pIdReglaPadre, pStrDisplay, pStrCssModificar) {

    var listaRecorrido = BuscarHijos(pIdReglaPadre);
    for (var i = 0; i < listaRecorrido.length; i++) {

        document.getElementById("fila_" + String(listaRecorrido[i])).style.display = pStrDisplay;
        $("#divImgBoton_" + String(pIdReglaPadre)).removeClass("oi-plus");
        $("#divImgBoton_" + String(pIdReglaPadre)).removeClass("oi-minus");
        $("#divImgBoton_" + String(pIdReglaPadre)).addClass(pStrCssModificar);
        ExpandirOContraerNodoPorIdPadre(listaRecorrido[i], pStrDisplay, pStrCssModificar);
    }
}
function BuscarHijos(pIdRegla) {
    var resultado = [];

    for (var i = 0; i < listaReglasRol.length; i++) {
        if (listaReglasRol[i].idPadreRegla == pIdRegla) {
            resultado.push(listaReglasRol[i].id);
        }
    }
    return resultado;
}