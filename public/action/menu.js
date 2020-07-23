let pid = null;
let cid = null;

$(document).ready(() => {
    $('.gallery-single').click(function () {
        console.log($(this));
        pid = $(this).attr('data-id');
        cid = $(this).parents('.tab-pane').attr('data-id');

        $.post(siteUrl + '/menu/popupDetails/'+cid+'/'+pid, (data) => {
            $("#orderModal").replaceWith(data);
            $('#orderModal').modal();
            $('.collapse').each(function(){
                $(this).addClass('show');
            });
        });
    });
});

$(document).on('click', '#confirmOrder', () => {
    getOrderData();
});

let getOrderData = () => {
    let details = [];
    $('.step').toArray().forEach((stepDiv, i) => {
        let step = $(stepDiv);
        let type = step.attr('step-type');
        let stepDetail = {};
        stepDetail.type = type;
        stepDetail.name = step.attr('step-name');
        stepDetail.values = [];
        if (type == Constants.StepType.Single) {
            // stepDetail.values.push($)
        }
    });
};