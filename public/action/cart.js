$(document).ready(function() {
    $('.cart').on('click', '.remove', (e) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure to delete this order?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sure'
        }).then(function (result) {
            if (result.value) {
                let id = $(e.target).parents('tr').attr('id');
                $.post(siteUrl+'/cart/delete', {id:id}, (data) => {
                    if (data == "Success") {
                        $(e.target).parents('tr').remove();
                        updateCarted();
                        Swal.fire({
                            icon: "success",
                            text: 'Successfully deleted!',
                            toast: true,
                            timer: 2000,
                            showConfirmButton: false,
                            position : "top-end",
                        });
                    } else {
                        Swal.fire({
                            title:'500: Error Occured in Backend',
                            text: 'Sorry...',
                            icon:'error'
                        });
                    }
                });
            }
        });
    })
    $('input[type="checkbox"]').change(function() {
        console.log('checked ', $(this).checked);
        console.log('object ', $(this));
        if ($(this)[0].checked) $(this).next().text('Delivery   ');
        else $(this).next().text('Take Away');
    });
    
})