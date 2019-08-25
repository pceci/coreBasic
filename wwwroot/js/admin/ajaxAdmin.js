function CargarArbolCombo() {
    $.ajax({
        type: "POST",
        url: "/admin/CargarArbolCombo",
        //data: { pIdRegla: pIdRegla, pNombre: pNombre, pPalabra: pPalabra},
        success:
            function (response) {
                OnCallBackCargarArbolCombo(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function IsNombreOPalabraNoSeRepite(pIdRegla, pNombre, pPalabra) {
    $.ajax({
        type: "POST",
        url: "/admin/IsNombreOPalabraNoSeRepite",
        data: { pIdRegla: pIdRegla, pNombre: pNombre, pPalabra: pPalabra },
        success:
            function (response) {
                OnCallBackIsNombreOPalabraNoSeRepiteModificar(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function ActualizarRegla(pIdRegla, pDescripcion, pPalabra, pAgregar, pEditar, pEliminar, pIdReglaPadre) {
    $.ajax({
        type: "POST",
        url: "/admin/ActualizarRegla",
        data: { pIdRegla: pIdRegla, pDescripcion: pDescripcion, pPalabra: pPalabra, pAgregar: pAgregar, pEditar: pEditar, pEliminar: pEliminar, pIdReglaPadre: pIdReglaPadre },
        success:
            function (response) {
                OnCallBackActualizarRegla(response);
            },
        failure: function (response) {
            OnFailActualizarRegla(response);
        },
        error: function (response) {
            OnFailActualizarRegla(response);
        }
    });
}
//InsertarRegla($("#txtNombreReglaInput").val(), $("#txtPalabraClaveInput").val(), $("#CheckBoxSoportadasAgregar").is(':checked'), $("#CheckBoxSoportadasEditar").is(':checked'), $("#CheckBoxSoportadasEliminar").is(':checked'), $("#comboReglasContenidas").val(), OnCallBackInsertarRegla, OnFail);
function InsertarRegla(pDescripcion, pPalabra, pAgregar, pEditar, pEliminar, pIdReglaPadre) {
    $.ajax({
        type: "POST",
        url: "/admin/InsertarRegla",
        data: { pDescripcion: pDescripcion, pPalabra: pPalabra, pAgregar: pAgregar, pEditar: pEditar, pEliminar: pEliminar, pIdReglaPadre: pIdReglaPadre },
        success:
            function (response) {
                OnCallBackInsertarRegla(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function EliminarRegla(pIdRegla) {
    $.ajax({
        type: "POST",
        url: "/admin/EliminarRegla",
        data: { pIdRegla: pIdRegla },
        success:
            function (response) {
                OnCallBackEliminarRegla(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
//RecuperarReglaPorId(idReglaSeleccionada, OnCallBackRecuperarReglaPorId, OnFail);
function RecuperarReglaPorId(pIdRegla) {
    $.ajax({
        type: "POST",
        url: "/admin/RecuperarReglaPorId",
        data: { pIdRegla: pIdRegla },
        success:
            function (response) {
                OnCallBackRecuperarReglaPorId(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}
function RecuperarReglaRaiz() {
    $.ajax({
        type: "POST",
        url: "/admin/RecuperarReglaRaiz",
        success:
            function (response) {
                OnCallBackRecuperarReglaPorId(response);
            },
        failure: function (response) {
            OnFail(response);
        },
        error: function (response) {
            OnFail(response);
        }
    });
}