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
            cssTipo ='alert-success';
            break;
        case 'danger':
            // $('#alertGeneric').addClass('alert-danger');
            cssTipo ='alert-danger';
            break;
        case 'info':
            // $('#alertGeneric').addClass('alert-info');
            cssTipo ='alert-info';
            break;
        default:
            cssTipo = 'alert-info';
            break;
    }
    // $('#alertGenericContent').html(pValue);
    $('#ContentAlert').html(getHtmlAlert(pValue,cssTipo));
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