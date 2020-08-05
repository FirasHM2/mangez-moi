var $table;
var flag = false;
$(document).ready(function () {
    $('button[name="save"]').hide();
    $table = $('#data-table-slides').DataTable({
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
    $.post(siteUrl + '/admin-panel/slides/add', {
        data: {
            content: $('#summernote').summernote('code'),
            image: image_data
        }
    }, function (id) {
        if(id == "already_exist"){
            Materialize.toast('already exist!', 2000, "red");
            return;
        }
        var code=$('#summernote').summernote('code');
       var element = $("#slide_element").append('<div class="col s12 m4 l4" data-key='+ id+' id = '+id +'><div class="gallery-single fix lightbox" style="height:230px;width:100%" >'+
       '<div class="img-fluid" id = "'+id +'_content"'+' style="background-image:url('+image_data+');'+
               'background-size:100% 100%;width:100%;height:100%" data-content="'+'" data-image="'+'"> <div class="center">'+
              code+
       '</div></div>'+
       '<div class="why-text">'+
           '<div class="btn-size btn-margin">'+
               '<button class="btn blue waves-effect waves-light" name='+'"update"'+ 'style="padding-top:0px"><i class="mdi-content-create"></i></button>'+
               '<button class="btn green waves-effect waves-light"'+ 'style="padding-top:0px;display:none" name='+"save"+'><i class="mdi-content-save"></i></'+'button>'+
               '<button id="<%=id%>_delete" class="btn cyan waves-effect waves-light" style="padding-top:0px"'+ 'name='+'"delete"'+'><i class="mdi-action-delete"></i></button>'+
           '</div>'+
       '</div>'+
   '</div>'+
'</div>');

        $("#"+id+'_content').attr('data-content',code);
        $("#"+id+'_content').attr('data-image',image_data);
        $(element).children().last().find('button[name="delete"]').click(function () {
            var id_element = $(this).parent().parent().parent().parent().attr('data-key');
            
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
                    $.post(siteUrl + '/admin-panel/slides/delete', {
                        id: id_element,
                    }, function (data) {
                        if (data == "Success") {
                            Materialize.toast('Successfully deleted!', 2000, "green");
                            $("#" + id_element).remove();
                            console.log( $("#" + id).children());
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

        $(element).children().last().find('button[name="save"]').click(function () {
            flag = false;
            var id_element = $(this).parent().parent().parent().parent().attr('data-key');
            $('#'+id_element+"_content").children().first().children().remove();
            $('#'+id_element+"_content").children().first().append($('#summernote').summernote('code'));
            $('#'+id_element+"_content").attr('data-content',$('#summernote').summernote('code'));
            $('#'+id_element+"_content").attr('data-image',image_data);
            $('#'+id_element+"_content").css('background-image','url('+image_data+')');
          $.post(siteUrl + '/admin-panel/slides/update', {
              id: id_element,
              data: {
                  content: $('#summernote').summernote('code'),
                  image: image_data
              }
          }, function (data) {
              if (data == "Success") {
                  Materialize.toast('Successfully updated!', 2000, "green");
              }
          });
      
          $(this).hide();
          $(this).prev().show();
      
          $("#add").show();
          $("#_update").hide();
      
          $('#summernote'). summernote('code', '')
          $("#image").val("");
          $('input.file-path').val('');
          image_data = '';
      });
      

      $("#"+id).find('button[name="update"]').click(function () {
        if(flag)
        {
            Materialize.toast('can not update!', 2000, "red");
            return;
        }
        flag = true;
        $(this).hide();
        $(this).next().show();
        
        $("#add").hide();
        $("#_update").show();
    
        u_id = $(this).parent().parent().parent().parent().attr('data-key');
        u_content = $(this).parent().parent().prev().attr('data-content');
        image_data = $(this).parent().parent().prev().attr('data-image');
    
        $('#summernote'). summernote('code', u_content)
        // $("#image").val("original_image");
        $('input.file-path').val('');
        // $(window).animate({
        //     scrollTop: 40000
        // }, 2000);
    });
        $('button[name="save"]').hide();
        Materialize.toast('Successfully added!', 2000, "green");
        $('#summernote'). summernote('code', '')
        $("#image").val("");
        $('input.file-path').val('');
        image_data = '';
    });
});

$('button[name="delete"]').click(function () {
    var id = $(this).parent().parent().parent().parent().attr('data-key');
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
            $.post(siteUrl + '/admin-panel/slides/delete', {
                id: id,
            }, function (data) {
                if (data == "Success") {
                    Materialize.toast('Successfully deleted!', 2000, "green");
                    $("#" + id).remove();
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
var u_id,u_buttonName,u_content;

$('button[name="update"]').click(function () {
    if(flag)
        {
            Materialize.toast('can not update!', 2000, "red");
            return;
        }
    flag = true;
    $(this).hide();
    $(this).next().show();

    $("#add").hide();
    $("#_update").show();

    u_id = $(this).parent().parent().parent().parent().attr('data-key');
    u_content = $(this).parent().parent().prev().attr('data-content');
    image_data = $(this).parent().parent().prev().attr('data-image');

    $('#summernote'). summernote('code', u_content)
    // $("#image").val("original_image");
    $('input.file-path').val('');
    // $(window).animate({
    //     scrollTop: 40000
    // }, 2000);
});

$('button[name="save"]').click(function () {
    flag = false;
      $('#'+u_id+'_content').children().first().children().remove();
      $('#'+u_id+'_content').children().first().append($('#summernote').summernote('code'));
      $('#'+u_id+'_content').attr('data-content',$('#summernote').summernote('code'));
      $('#'+u_id+'_content').attr('data-image',image_data);
    //   $('#'+u_id+'_content').attr('style','"background-image:url('+image_data+');'+
    //   'background-size:cover;width:100%;height:100%"');
      $('#'+u_id+'_content').css('background-image','url('+image_data+')');

    $.post(siteUrl + '/admin-panel/slides/update', {
        id: u_id,
        data: {
            content: $('#summernote').summernote('code'),
            image: image_data
        }
    }, function (data) {
        if (data == "Success") {
            Materialize.toast('Successfully updated!', 2000, "green");
        }
    });

    $(this).hide();
    $(this).prev().show();

    $("#add").show();
    $("#_update").hide();

    $('#summernote'). summernote('code', '')
    $("#image").val("");
    $('input.file-path').val('');
    image_data = '';
});

$('#_update').click(function () {
    flag = false;
      $('#'+u_id+'_content').children().first().children().remove();
      $('#'+u_id+'_content').children().first().append($('#summernote').summernote('code'));
      $('#'+u_id+'_content').attr('data-content',$('#summernote').summernote('code'));
      $('#'+u_id+'_content').attr('data-image',image_data);
    //   $('#'+u_id+'_content').attr('style','"background-image:url('+image_data+');'+
    //   'background-size:cover;width:100%;height:100%"');
      $('#'+u_id+'_content').css('background-image','url('+image_data+')');

    $.post(siteUrl + '/admin-panel/slides/update', {
        id: u_id,
        data: {
            content: $('#summernote').summernote('code'),
            image: image_data
        }
    }, function (data) {
        if (data == "Success") {
            Materialize.toast('Successfully updated!', 2000, "green");
        }
    });

    $('#'+u_id+'_content').next().children().children().first().show();
    $('#'+u_id+'_content').next().children().children().first().next().hide();
    $("#add").show();
    $("#_update").hide();

    $('#summernote'). summernote('code', '')
    $("#image").val("");
    $('input.file-path').val('');
    image_data = '';
});