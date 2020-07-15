var $table;

$(document).ready(function() {
    $table = $('#data-table-ings').DataTable({
        searching: false,
        ordering: false,
    });	
});

$("#add").click(function() {
     $.post(siteUrl + '/admin-panel/ingredients/add', {
        data: {
            category: $('#category').val(),
            name: $("#name").val(),
            price: $("#price").val()
        }
    }, function(id) {
        var nRow = $table.row.add(['<input value="' + $("#name").val() + '" type="text" readonly>', '<input value="' + $("#price").val() + '" type="text" readonly>', '<select name="available"><option value="true">Available</option><option value="false" selected>Not Available</option></select>']).draw().node();
        $(nRow).attr('data-key', id);
        $("select:not(.initialized)").on('change', function () {
            var _id = $(this).parent().parent().parent().attr('data-key');
            $.post(siteUrl + '/admin-panel/ingredients/update', {
                _id: _id,
                data: {
                    available: $(this).val(),
                },
            }, function (data) {
                Materialize.toast('Successfully changed!', 2000, "green");
            });
        });
        $("select:not(.initialized)").material_select();
        Materialize.toast('Successfully added!', 2000, "green");
    }); 
});

$('select[name="available"]').on('change', function () {
    var _id = $(this).parent().parent().parent().attr('data-key');
    $.post(siteUrl + '/admin-panel/ingredients/update', {
        _id: _id,
        data: {
            available: $(this).val(),
        },
    }, function (data) {
        Materialize.toast('Successfully changed!', 2000, "green");
    });
});
