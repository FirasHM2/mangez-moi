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
    if (!confirm('Do you want reset his/her password?')) return;
    var email = $(this).parent().parent().attr('data-user');
    $.post(siteUrl + '/admin-panel/users/reset', {
        email: email,
    }, function (data) {
        if (data == "Success") {
            alert('password of '+ email +' was reset to 123456');
        }
    });
})
