function post(params) {
    $.ajax({
        url:'/success',
        type:'post',
        data: 'id=' + params,
        success:function(){
            alert("worked");
        }
    });
}