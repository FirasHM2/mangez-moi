var $table;

$(document).ready(function() {
    $('button[name="save"]').hide();
    $table = $('#data-table-meats').DataTable({
        searching: true,
        ordering: false,
        order:[[0, 'desc']],
        paging:false,
        columnDefs:[{
            targets:[4],
            visible:false
        }],
    });
    $('#categoryId').change();
});

$('#categoryId').change(function() {
    let cid = $(this).val();
    $table.column(4).search(cid).draw();
});

$("#add").click(function() {
     $.post(siteUrl + '/admin-panel/meats/add', {
        data: {
            category: $('#categoryId').val(),
            name: $("#name").val(),
            price: $("#price").val()
        }
    }, function(id) {
        if (id === 'already_exist') {
            Materialize.toast('This item is already exist!', 2000, 'red');
            return;
        }
        var nRow = $table.row.add(['<input value="' + $("#name").val() + '" type="text" readonly>', '<input value="' + $("#price").val() + '" type="number" readonly>', '<input type="checkbox" name="available" id="'+id+'_available" /><label for="' + id + '_available">Not Available</label>', '<button class="btn blue waves-effect waves-light" name="update"><i class="mdi-content-create"></i></button> <button class="btn green waves-effect waves-light" name="save"><i class="mdi-content-save"></i></button> <button class="btn cyan waves-effect waves-light" name="delete"><i class="mdi-action-delete"></i></button>', $('#categoryId').val()]).draw().node();
        $(nRow).attr('data-key', id);
        $(nRow).attr('id', id);
        
        $('button[name="save"]').hide();

        $($(nRow).find('button[name="delete"]')[0]).click(function () {
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
                    $.post(siteUrl + '/admin-panel/meats/delete', {
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
        
        $($(nRow).find('button[name="update"]')[0]).click(function () {
            var _id = $(this).parent().parent().attr('data-key');
            $(this).hide();
            $(this).next().show();
            
            $(this).parent().parent().find("input[readonly]").each(function() {
                $(this).prop('readonly', false);
            });
        
        });
        
        $($(nRow).find('button[name="save"]')[0]).click(function () {
            
            var _id = $(this).parent().parent().attr('data-key');
            var name = $(this).parent().prev().prev().prev().children().val();
            var price = $(this).parent().prev().prev().children().val();
        
            $.post(siteUrl + '/admin-panel/meats/update', {
                _id: _id,
                data: {
                    name: name,
                    price: price
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

        $($(nRow).find('input[name="available"]')[0]).change(function () {
            var _id = $(this).parent().parent().attr('data-key');
            var label = $($(this)[0]).next();
            $.post(siteUrl + '/admin-panel/meats/update', {
                _id: _id,
                data: {
                    available: $(this)[0].checked,
                },
            }, function (data) {
                if ($(label).text() == "Available") $(label).text('Not Available');
                else $(label).text('Available');
                Materialize.toast('Successfully updated!', 2000, "green");
            });    
        });

        Materialize.toast('Successfully added!', 2000, "green");
        $("#name").val('');
        $("#price").val('');
    });
});


$('input[name="available"]').change(function () {
    var _id = $(this).parent().parent().attr('data-key');
    var label = $($(this)[0]).next();
    $.post(siteUrl + '/admin-panel/meats/update', {
        _id: _id,
        data: {
            available: $(this)[0].checked,
        },
    }, function (data) {
        if ($(label).text() == "Available") $(label).text('Not Available');
        else $(label).text('Available');
        Materialize.toast('Successfully updated!', 2000, "green");
    });    
});

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
            $.post(siteUrl + '/admin-panel/meats/delete', {
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
    var price = $(this).parent().prev().prev().children().val();

    $.post(siteUrl + '/admin-panel/meats/update', {
        _id: _id,
        data: {
            name: name,
            price: price
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
