function alertSuccess(pValue) {
    alertGeneric(pValue, 'success');
}
function alertDanger(pValue) {
    alertGeneric(pValue, 'danger');
}
function alertInfo(pValue) {
    alertGeneric(pValue, 'info');
}
function alertGeneric(pValue, pTipo) {
    // $('#alertGeneric').removeClass('alert-success');
    // $('#alertGeneric').removeClass('alert-danger');
    // $('#alertGeneric').removeClass('alert-info');
    var cssTipo = '';
    switch (pTipo) {
        case 'success':
            // $('#alertGeneric').addClass('alert-success');
            cssTipo = 'alert-success';
            break;
        case 'danger':
            // $('#alertGeneric').addClass('alert-danger');
            cssTipo = 'alert-danger';
            break;
        case 'info':
            // $('#alertGeneric').addClass('alert-info');
            cssTipo = 'alert-info';
            break;
        default:
            cssTipo = 'alert-info';
            break;
    }
    // $('#alertGenericContent').html(pValue);
    $('#ContentAlert').html(getHtmlAlert(pValue, cssTipo));
    $('#alertGeneric').alert();
}
function alertGenericClose() {
    $('#alertGeneric').alert('close');
}

function getHtmlAlert(pValue, pTipo) {
    var result = '';
    result += '<div id="alertGeneric" class="alert ' + pTipo + ' alert-dismissible fade show" role="alert">';
    result += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
    result += '<span aria-hidden="true">&times;</span>';
    result += '</button>';
    result += '<div id="alertGenericContent">' + pValue + '</div>';
    result += '</div>';
    return result;
}
function getHtmlModal(pTitulo, pMensaje, pNombre_button_aceptar, pNombre_button_cancelar, clickbutton_aceptar, clickbutton_cancelar) {
    var result = '';
    result += '<div id="modalGeneric" class="modal" tabindex="-1" role="dialog">';
    result += '<div class="modal-dialog" role="document">';
    result += '<div class="modal-content">';
    result += '<div class="modal-header">';
    result += '<h5 class="modal-title">' + pTitulo + '</h5>';
    result += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    result += '<span aria-hidden="true">&times;</span>';
    result += '</button>';
    result += '</div>';
    result += '<div class="modal-body">';
    result += pMensaje;
    result += '</div>';
    result += '<div class="modal-footer">';
    result += '<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="' + clickbutton_cancelar + '">' + pNombre_button_cancelar + '</button>';
    result += '<button type="button" class="btn btn-primary" onclick="' + clickbutton_aceptar + '" >' + pNombre_button_aceptar + '</button>';
    result += '</div>';
    result += '</div>';
    result += '</div>';
    result += '</div>';
    return result;
}
function mensaje_confirmar(pTitulo, pMensaje, pNombre_button_aceptar, pNombre_button_cancelar, clickbutton_aceptar, clickbutton_cancelar) {
    var html = getHtmlModal(pTitulo, pMensaje, pNombre_button_aceptar, pNombre_button_cancelar, clickbutton_aceptar, clickbutton_cancelar);
    $("#ContentModal").html(html);
    $("#modalGeneric").modal();
}
function cerrar_mensaje_confirmar(){
$('#modalGeneric').modal('hide');
}