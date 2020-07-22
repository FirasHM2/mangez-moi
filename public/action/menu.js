let pid = null;

$(document).ready(() => {
    $('.gallery-single').click(function () {
        $('#orderModal').modal();
        console.log($(this));
        pid = $(this).attr('data-id');
        let cid = $(this).parents('.tab-pane').attr('data-id');
        $.post(siteUrl + '/admin-panel/categories/get/'+cid, (data) => {
            console.log('data', data);
        });
    });
});