$('select[name="role"]').change(function () {
    var email = $(this).parent().parent().parent().attr('data-user');
    $.post(siteUrl + '/admin-panel/users/update', {
        email: email,
        data: {
            role: $(this).val(),
        },
    }, function (data) {
    });
});

$('input[name="verified"]').change(function () {
    var email = $(this).parent().parent().attr('data-user');

    $.post(siteUrl + '/admin-panel/users/update', {
        email: email,
        data: {
            verified: $(this)[0].checked,
        },
    }, function (data) {

    });
});

$('input[name="wallet"]').change(function () {
    var email = $(this).parent().parent().attr('data-user');

    $.post(siteUrl + '/admin-panel/users/update', {
        email: email,
        data: {
            wallet: $(this).val(),
        },
    }, function (data) {

    });
});

$('input[name="enabled"]').change(function () {
    var email = $(this).parent().parent().attr('data-user');

    $.post(siteUrl + '/admin-panel/users/update', {
        email: email,
        data: {
            enabled: $(this)[0].checked,
        },
    }, function (data) {

    });
});

$('button[name="reset"]').click(function () {
    var email = $(this).parent().parent().attr('data-user');
    Swal.fire({
        title: 'Confirm!',
        text: 'Do you want reset his/her password?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure'
    }).then(function (result) {
        if (result.value) {
            $.post(siteUrl + '/admin-panel/users/reset', {
                email: email,
            }, function (data) {
                if (data == "Success") {
                    Swal.fire({
                        title:'Success',
                        text: 'password of ' + email + ' was reset to 123456',
                        icon:'success'
                    });
                }
            });
        }
    });

});
$(document).ready(function () {

})