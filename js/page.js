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
        $.ajax({
            type: 'POST',
            url: "http://www.charleymot.com/server/petal/wish",
            data: {
                desc: value,
                name: '郑梦婷'
            },
            cache: false,
            async: true,
            success: function (data) {
                if (data.code == 200) {
                    var dataStrObj = JSON.parse(data.data);
                    createItem(dataStrObj[0].description, dataStrObj[0].name, dataStrObj[0].createdate);
                    $("#input").val('');
                } else {
                    alert(data.message);
                }
            },
            error: function (e) {
                alert("网络通信失败" + e);
            }
        });
    }



});