var $table;
let editing = false;

$(document).ready(function() {
    $('.categoryAction .cancel').hide();
    $('.categoryAction .addCategory').text('Add New Category');
    $table = $('#data-table-cats').DataTable({
        searching: false,
        ordering: false,
        paging: false,
    });
    $table.on('click', 'button[name="delete"]', function(e) {
        let id = $(e.target).parent().parent().attr('id');
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
                $.post(siteUrl + '/admin-panel/categories/delete',  {
                    id : id
                }, function(data) {
                    if (data == 'Success') {
                        Materialize.toast("Successfully added!", 2000, 'green');
                        $table.row('#'+id).remove().draw();
                    }
                });
            }
        });
    });
    $table.on('click', 'button[name="update"]', function(e) {
        if (editing) return;
        editing = true;
        let id = $(e.target).parent().parent().attr('id');
        $.post(siteUrl+'/admin-panel/categories/get/'+id, function(data) {
            $('#categoryName').val(data.name);
            $('#categoryName').attr('data-id', id);
            for (let i in data.steps) {
                let step = data.steps[i];

                let stepNode = $(stepTemplate);
                stepNode.find('.deleteStep').click(function() {
                    stepNode.remove();
                });
                stepNode.find('input[name="stepName"]').val(step.name);
                stepNode.find('input[name="stepName"]').focus();
                stepNode.find('select[name="stepType"]').val(step.type);
                stepNode.find('select[name="stepCollection"]').val(step.collection);
                stepNode.find('select').material_select();
                $('.categoryAction').before(stepNode);
            }
            $('.categoryAction .addCategory').text('Update');
            $('.categoryAction .cancel').show();
            $('.categoryAction')[0].scrollIntoView();
        });
    })
    $table.on('change', 'input[name="available"]', function(e) {
        let target = $(e.target);
        console.log('target', target);
        var id = target.parent().parent().attr('id');
        console.log('id', id);
        var label = target.next();
        $.post(siteUrl + '/admin-panel/categories/update', {
            id: id,
            data: {
                available: target[0].checked,
            },
        }, function (data) {
            if (label.text() == "Available") label.text('Not Available');
            else label.text('Available');
            Materialize.toast('Successfully updated!', 2000, "green");
        });    
    });
});

$('.categoryAction .insertStep').click(function() {
    let step = $(stepTemplate);
    step.find('select').material_select();
    step.find('.deleteStep').click(function() {
        step.remove();
    });
    $('.categoryAction').before(step);
    step[0].scrollIntoView();
});
$('.categoryAction .addCategory').click(function() {
    let categoryName = $('#categoryName').val();
    let id = $('#categoryName').attr('data-id');
    let valid = true;
    if (!categoryName) {
        Materialize.toast('Please insert name of category!', 2000, "yellow darken-4");
        valid = false;
        return;
    }
    let steps = [];
    $('.row.step').toArray().forEach((item, index) => {
        let stepName = $(item).find('input[name="stepName"]').val();
        let stepType = $(item).find('select[name="stepType"]').val();
        let stepCollection = $(item).find('select[name="stepCollection"]').val();
        if (!stepName) {
            Materialize.toast('Please insert name of step ' + (index + 1), 2000, 'yellow darken-4');
            valid = false;
            return
        }
        let step = {name : stepName, type : stepType, collection : stepCollection};
        steps.push(step);
    });
    if (!valid) return;
    $.post(siteUrl + '/admin-panel/categories/add', {
        data : {
            id : id,
            name:categoryName,
            steps:steps
        },
    }, function(data) {
        if (data.status == 'Success') {
            let stepTd = steps.reduce((prv, cur) => prv + '<li>'+cur.name+'</li>', '<ul>') + '</ul>'; 
            let rowData = [categoryName, stepTd, '<input type="checkbox" name="available" id="'+data.id+'_available" /><label for="' + data.id + '_available">Not Available</label>', '<button class="btn blue waves-effect waves-light" name="update"><i class="mdi-content-create"></i></button> <button class="btn cyan waves-effect waves-light" name="delete"><i class="mdi-action-delete"></i></button>'];
            console.log('editing', editing);
            if (editing) {
                $table.cell('tr#'+id, 0).data(rowData[0]);
                $table.cell('tr#'+id, 1).data(rowData[1]);
            } else {
                let nRow = $table.row.add(rowData).draw().node();
                $(nRow).attr('id', data.id);
            }
            Materialize.toast('Successfully added!', 2000, 'green');
        } else {
            Materialize.toast(data.msg, 2000, 'red');
        }
        editing = false;
        $('#categoryName').val('');
        $('#categoryName').attr('data-id', '');
        $('.row.step').remove();
        $('.categoryAction .addCategory').text('Add New Category');
        $('.categoryAction .cancel').hide();
    });
});

$('.categoryAction .cancel').click(function() {
    editing = false;
    $('#categoryName').val('');
    $('#categoryName').attr('data-id', '');
    $('.row.step').remove();
    $('.categoryAction .addCategory').text('Add New Category');
    $('.categoryAction .cancel').hide();
});