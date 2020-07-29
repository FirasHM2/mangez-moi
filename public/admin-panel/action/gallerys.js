var $table;

$(document).ready(function () {
    $('button[name="save"]').hide();
    $table = $('#data-table-gallerys').DataTable({
        searching: true,
        ordering: false,
        order: [[0, 'desc']],
        paging: false,
    });
   
});


var image_data = "";

$("#image").change(function () {
    if (this.files && this.files[0]) {
        if (this.files[0].size >= 15 * 1024 * 1024) {
            Swal.fire({
                title: 'File size is too large!',
                text: 'Sorry...',
                icon: 'error'
            });
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            image_data = e.target.result;
        }
        reader.readAsDataURL(this.files[0]);
    }
});

$("#add").click(function () {
    $.post(siteUrl + '/admin-panel/gallerys/add', {
        data: {
            name: $("#name").val(),
            description: $("#description").val(),
            image: image_data
        }
    }, function (id) {
        if(id == "already_exist"){
            Materialize.toast('already exist!', 2000, "red");
            return;
        }
        var nRow = $table.row.add(['<input value="' + $("#name").val() + '" type="text" readonly>', '<input value="' + $("#description").val() + '" type="text" readonly>',  '<img src = "#" width="80" height="80" class="tooltipped" data-position="left" data-delay="50" data-tooltip="#"/>' , '<button class="btn blue waves-effect waves-light" name="update"><i class="mdi-content-create"></i></button> <button class="btn green waves-effect waves-light" name="save"><i class="mdi-content-save"></i></button> <button class="btn cyan waves-effect waves-light" name="delete"><i class="mdi-action-delete"></i></button>']).draw().node();
        $(nRow).attr('data-key', id);
        $(nRow).attr('id', id);
        $($(nRow).find('img')[0]).attr('src', image_data);
        $($(nRow).find('img')[0]).attr('data-tooltip', '<img src = "' + image_data + '" height = "200px" width="auto"/>');
        $($(nRow).find('img')[0]).tooltip();

        $('button[name="save"]').hide();

        $($(nRow).find('button[name="delete"]')[0]).click(function () {
            var id = $(this).parent().parent().attr('data-key');
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
                    $.post(siteUrl + '/admin-panel/gallerys/delete', {
                        id: id,
                    }, function (data) {
                        if (data == "Success") {
                            Materialize.toast('Successfully deleted!', 2000, "green");
                            $table.row("#" + id).remove().draw();
                        } else {
                            Swal.fire({
                                title: '500: Error Occured in Backend',
                                text: 'Sorry...',
                                icon: 'error'
                            });
                        }
                    });
                }
            });

        });

        $($(nRow).find('button[name="update"]')[0]).click(function () {
            $(this).hide();
            $(this).next().show();

            $(this).parent().parent().find("input[readonly]").each(function () {
                $(this).prop('readonly', false);
            });

        });

        $($(nRow).find('button[name="save"]')[0]).click(function () {

            var id = $(this).parent().parent().attr('data-key');
            var name = $(this).parent().prev().prev().prev().children().val();
            var description = $(this).parent().prev().prev().children().val();
            $.post(siteUrl + '/admin-panel/gallerys/update', {
                id: id,
                data: {
                    name: name,
                    description: description,
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
        $("#description").val('');
        $("#image").val("");
        $('input.file-path').val('');
        image_data = '';
    });
});

$('button[name="delete"]').click(function () {
    var id = $(this).parent().parent().attr('data-key');
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
            $.post(siteUrl + '/admin-panel/gallerys/delete', {
                id: id,
            }, function (data) {
                if (data == "Success") {
                    Materialize.toast('Successfully deleted!', 2000, "green");
                    $table.row("#" + id).remove().draw();
                } else {
                    Swal.fire({
                        title: '500: Error Occured in Backend',
                        text: 'Sorry...',
                        icon: 'error'
                    });
                }
            });
        }
    });

});

$('button[name="update"]').click(function () {
    $(this).hide();
    $(this).next().show();

    $(this).parent().parent().find("input[readonly]").each(function () {
        $(this).prop('readonly', false);
    });
});

$('button[name="save"]').click(function () {
    var id = $(this).parent().parent().attr('data-key');
    var name = $(this).parent().prev().prev().prev().children().val();
    var description = $(this).parent().prev().prev().children().val();
    $.post(siteUrl + '/admin-panel/gallerys/update', {
        id: id,
        data: {
            name: name,
            description: description,
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

// update image
$(".image").change(function() {
    var id = $(this).parent().parent().attr('data-key');
    var current_image = $(this).prev();

    console.log('id', id);
    if (this.files && this.files[0]) {
        if (this.files[0].size >= 15 * 1024 * 1024) {
            Swal.fire({
                title: 'File size is too large!',
                text: 'Sorry...',
                icon: 'error'
            });
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            image_data = e.target.result;
            $.post(siteUrl + '/admin-panel/gallerys/update', {
                id: id,
                data: {
                    image: image_data
                },
            }, function (data) {
                current_image.attr('src', image_data);
                Materialize.toast('Successfully updated!', 2000, "green");
            });
        }
        reader.readAsDataURL(this.files[0]);
    }
});

// open file open dialog
$('img[name="image"]').click(function () {
    image_data = $(this).attr('src');
    $(this).next().click();
});