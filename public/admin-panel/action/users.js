$('select[name="role"]').change(function () {
    var email = $(this).parent().parent().parent().attr('data-user');
    $.post(siteUrl + '/admin-panel/users/update', {
        email: email,
        data: {
            role: $(this).val(),
        },
    }, function (data) {
        Materialize.toast('Successfully updated!', 2000, "green");
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
        Materialize.toast('Successfully updated!', 2000, "green");
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
        Materialize.toast('Successfully updated!', 2000, "green");
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
        Materialize.toast('Successfully updated!', 2000, "green");
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
                    Materialize.toast('Successfully reseted to "123456!"', 2000, "green");
                }
            });
        }
    });

});
