var $table;

$(document).ready(function() {
    $('button[name="save"]').hide();
    $table = $('#data-table-cats').DataTable({
        searching: false,
        ordering: false,
        paging: false,
    });    
});

$("#add").on('click', function() {
     $.post(siteUrl + '/admin-panel/categories/add', {
        data: {
            name: $("#name").val(),
            detail: $("#detail").val()
        }
    }, function(id) {
        if (id === 'already_exist') {
            Swal.fire({
                title:'Sorry!',
                text: 'This item is already exist!',
                icon:'info'
            });
            return;
        }

        var nRow = $table.row.add(['<input value="' + $("#name").val() + '" type="text" readonly="true">', '<input value="' + $("#detail").val() + '" type="text" readonly="true">', '<select name="available"><option value="true">Available</option><option value="false" selected>Not Available</option></select>', '<button class="btn blue waves-effect waves-light" name="update"><i class="mdi-content-create"></i></button><button class="btn green waves-effect waves-light" name="save"><i class="mdi-content-save"></i></button><button class="btn cyan waves-effect waves-light" name="delete"><i class="mdi-action-delete"></i></button>']).draw().node();
        $(nRow).attr('data-key', id);
        $(nRow).attr('id', id);
        $("select:not(.initialized)").on('change', function () {
            var _id = $(this).parent().parent().parent().attr('data-key');
            $.post(siteUrl + '/admin-panel/categories/update', {
                _id: _id,
                data: {
                    available: $(this).val(),
                },
            }, function (data) {
                Materialize.toast('Successfully changed!', 2000, "green");
            });
        });
        $("select:not(.initialized)").material_select();
        $('button[name="save"]').hide();

        $('button[name="delete"]').click(function () {
            var _id = $(this).parent().parent().attr('data-key');
            Swal.fire({
                title: 'Confirm!',
                text: 'Are you sure to delete this item?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sure'
            }).then(function (result) {
                if (result.value) {
                    $.post(siteUrl + '/admin-panel/categories/delete', {
                        _id: _id,
                    }, function (data) {
                        if (data == "Success") {
                            Materialize.toast('Successfully deleted!', 2000, "green");
                            $table.row("#" + _id).remove().draw();
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
        
        });
        
        $('button[name="update"]').click(function () {
            var _id = $(this).parent().parent().attr('data-key');
            $(this).hide();
            $(this).next().show();
            
            $(this).parent().parent().find("input[readonly]").each(function() {
                $(this).prop('readonly', false);
            });
        
        });
        
        $('button[name="save"]').click(function () {
            
            var _id = $(this).parent().parent().attr('data-key');
            var name = $(this).parent().prev().prev().prev().children().val();
            var detail = $(this).parent().prev().prev().children().val();
        
            $.post(siteUrl + '/admin-panel/categories/update', {
                _id: _id,
                data: {
                    name: name,
                    detail: detail
                }
            }, function (data) {
                if (data == "Success") {
                    Materialize.toast('Successfully updated!', 2000, "green");
                }
            });
        
            $(this).hide();
            $(this).prev().show();
            $($(this).parent().parent().find("input")[0]).prop('readonly', true);
            $($(this).parent().parent().find("input")[1]).prop('readonly', true);
        });

        Materialize.toast('Successfully added!', 2000, "green");
        $("#name").val('');
        $("#detail").val('');
    }); 
});

// $('select[name="available"]').on('change', function () {
//     var _id = $(this).parent().parent().parent().attr('data-key');
//     $.post(siteUrl + '/admin-panel/categories/update', {
//         _id: _id,
//         data: {
//             available: $(this).val(),
//         },
//     }, function (data) {
//         Materialize.toast('Successfully changed!', 2000, "green");
//     });
// });

$('button[name="delete"]').click(function () {
    var _id = $(this).parent().parent().attr('data-key');
    Swal.fire({
        title: 'Confirm!',
        text: 'Are you sure to delete this item?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure'
    }).then(function (result) {
        if (result.value) {
            $.post(siteUrl + '/admin-panel/categories/delete', {
                _id: _id,
            }, function (data) {
                if (data == "Success") {
                    Materialize.toast('Successfully deleted!', 2000, "green");
                    $table.row("#" + _id).remove().draw();
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

});

$('button[name="update"]').click(function () {
    var _id = $(this).parent().parent().attr('data-key');
    $(this).hide();
    $(this).next().show();
    
    $(this).parent().parent().find("input[readonly]").each(function() {
        $(this).prop('readonly', false);
    });
    $(this).parent().parent().find("span[disabled]").each(function() {
        $(this).removeClass('disabled');
    });

});

$('button[name="save"]').click(function () {
    
    var _id = $(this).parent().parent().attr('data-key');
    var name = $(this).parent().prev().prev().prev().children().val();
    var detail = $(this).parent().prev().prev().children().val();

    $.post(siteUrl + '/admin-panel/categories/update', {
        _id: _id,
        data: {
            name: name,
            detail: detail
        }
    }, function (data) {
        if (data == "Success") {
            Materialize.toast('Successfully updated!', 2000, "green");
        }
    });

    $(this).hide();
    $(this).prev().show();
    $($(this).parent().parent().find("input")[0]).prop('readonly', true);
    $($(this).parent().parent().find("input")[1]).prop('readonly', true);
    $($(this).parent().parent().find("span")[0]).addClass('disabled');
});
