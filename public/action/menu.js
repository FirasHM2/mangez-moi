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
            $('#orderModal input').change(() => {updatePrice()});
            $('#orderModal button.btn-counting').click(handleCountBtn);
            $('#orderModal button.btn-counting').click(() => {updatePrice()});
            $('.collapse').each(function(){
                $(this).addClass('show');
            });
        });
    });
});

$(document).on('click', '#confirmOrder', () => {
    let order = getOrderData();
    Swal.fire({
        title: 'Comments',
        text: "Leave comment here",
        icon: 'info',
        input: 'textarea', 
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Send'
    }).then((result) => {
        order.comment = result.value;
        console.log('comment', order.comment);
        $.post(siteUrl + '/menu/addOrder', order).done((data) => {
            Swal.fire({
                title: 'Success',
                text: 'Successfully carted!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        })
        .fail(() => {
            Swal.fire({
                title: 'Failed',
                text: 'Oops something goes wrong!',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        })
    });
});

let updatePrice = () => {
    console.log('order', getOrderData());
    let order = getOrderData();
    $.post(siteUrl+'/menu/getOrderPrice', {
        customer:order.customer,
        category:order.category,
        product:order.product,
        count : order.count,
        details: order.details
    }, (data) => {
        $('#orderModal #totalPrice').text(data + "€");
    })
}

let getOrderData = () => {
    let details = [];
    $('#orderModal .step').toArray().forEach((stepDiv, i) => {
        let step = $(stepDiv);
        let type = step.attr('step-type');
        let stepDetail = {};
        stepDetail.type = type;
        stepDetail.name = step.attr('step-name');
        stepDetail.collection = step.attr('step-collection');
        stepDetail.values = [];
        if (type == Constants.StepType.Single) {
            stepDetail.values = stepDetail.values.concat(step.find('input[name="step_' + i + '"]:checked').val());
        } else if (type == Constants.StepType.Multiple) {
            stepDetail.values = stepDetail.values.concat(step.find('input[name="step_' + i + '"]:checked').toArray().map((item) => $(item).attr('data-id')));
        } else if (type == Constants.StepType.Count) {
            stepDetail.values = stepDetail.values.concat(step.find('span[name="step_' + i + '"]').toArray().map((item) => {
                return {id:$(item).attr('data-id'), count:$(item).text()}
            }));
        }
        details.push(stepDetail);
    });
    let count = $('#orderModal #totalCount').text();
    return {
        category : cid,
        product : pid,
        details : details,
        count : count,
    };
};