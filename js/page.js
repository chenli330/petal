$(document).ready(function () {


    var pageSize = 11;
    $("#nextOpt").click(function () {
        var i = $("#nextOpt").attr('name');
        if (i >= pageSize) {
            i = 0;
        }
        i++;
        $("#jishi").attr('src', "./powerview/幻灯片" + i + ".jpg");
        $("#nextOpt").attr('name', i);
    });

    $("#frontOpt").click(function () {
        var i = $("#nextOpt").attr('name');
        if (i <= 1) {
            i = pageSize + 1;
        }
        i--;
        $("#jishi").attr('src', "./powerview/幻灯片" + i + ".jpg");
        $("#nextOpt").attr('name', i);
    });

    $("#frontWish").click(function () {
        alert("待完善");
    });
    $("#nextWish").click(function () {
        alert("待完善");
    });


    $("#addWishClick").click(function () {
        var value = $("#input").val();
        if (value) {
            submitWish(value,'郑梦婷');
        }
    });

    function submitWish(desc,name) {
        $.post("http://www.charleymot.com/server/petal/wish",
            {
                desc:desc,
                name:name
            },
            function(data,status){
                console.log(status);
                var obj= JSON.parse(data);
                if(obj.code==200) {
                    var dataStrObj=JSON.parse(obj.data);
                    createItem(dataStrObj[0].description,dataStrObj[0].name,dataStrObj[0].createdate);
                    $("#input").val('');
                }else{
                    alert(obj.message);
                }
            });
    }



});