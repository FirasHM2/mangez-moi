var $table;

$(document).ready(function() {
    $table = $('#data-table-cats').DataTable({
        searching: false,
        ordering: false,
    });	
});

$("#add").click(function() {
    $.post(siteUrl + '/admin-panel/categories/add', {
        data: {
            name: $("#name").val(),
            detail: $("#detail").val()
        }
    }, function(id) {
        var nRow = $table.row.add(['<input value="' + $("#name").val() + '" type="text" readonly>', '<input value="' + $("#detail").val() + '" type="text" readonly>', '<select name="available"><option value="true">Available</option><option value="false" selected>Not Available</option></select>']).draw().node();
        $(nRow).attr('data-key', id);
        $("select:not(.initialized)").on('change', function () {
            var _id = $(this).parent().parent().parent().attr('data-key');
            $.post(siteUrl + '/admin-panel/categories/update', {
                _id: _id,
                data: {
                    available: $(this).val(),
                },
            }, function (data) {
            });
        });
        $("select:not(.initialized)").material_select();
    });
});

$('select[name="available"]').on('change', function () {
    var _id = $(this).parent().parent().parent().attr('data-key');
    $.post(siteUrl + '/admin-panel/categories/update', {
        _id: _id,
        data: {
            available: $(this).val(),
        },
    }, function (data) {
    });
});
