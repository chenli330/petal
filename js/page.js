$(document).ready(function () {
    var pageSize=11;
    $("#nextOpt").click(function () {
        var i=$("#nextOpt").attr('name');
        if (i>=pageSize){
            i=0;
        }
        i++;
        $("#jishi").attr('src',"./powerview/幻灯片"+i+".jpg");
        $("#nextOpt").attr('name',i);
    });

    $("#frontOpt").click(function () {
        var i=$("#nextOpt").attr('name');
            if (i<=1){
                i=pageSize+1;
            }
            i--;
            $("#jishi").attr('src',"./powerview/幻灯片"+i+".jpg");
            $("#nextOpt").attr('name',i);
    });

    $("#addWishClick").click(function () {
        var value =$("#input").val();
        if (value) {
            createItem(value);
            $("#input").val('');
        }
    });




});