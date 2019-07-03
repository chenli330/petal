var container;

// 可选颜色
var colors = ['#96C2F1', '#BBE1F1', '#E3E197', '#F8B3D0', '#FFCC00'];

//创建许愿页
var createItem = function (text, name, time) {
    var color = colors[parseInt(Math.random() * 5, 10)]
    container.html("");
    $('<div class="item"><p><br/>&nbsp;&nbsp;&nbsp;&nbsp;' + text + '</p><p class="wishname">By&nbsp;&nbsp;&nbsp;&nbsp;' + name + '</p><p class="wishtime">' + time + '</p></div>').css({'background': color}).appendTo(container);
};



// 初始化
var init = function () {
    container = $('#container');
    getWish(1,1);
}

function submitWish(desc,name) {
    $.ajax({
        type: 'POST',
        url: "http://www.charleymot.com/server/petal/wish",
        data: {
            desc: desc,
            name: name
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

function getWish(pageSize,pageNum){
    $.ajax({
        type: 'POST',
        url: "http://www.charleymot.com/server/petal/getWish",
        data: {
            pageSize: pageSize,
            pageNum: pageNum
        },
        cache: false,
        success: function (data) {
            if (data.code == 200) {
                var dataStrObj = JSON.parse(data.data);
                createItem(dataStrObj[0].description, dataStrObj[0].name, dataStrObj[0].createdate);
            } else {
                alert(data.message);
            }
        },
        error: function (e) {
            alert("网络通信失败" + e);
        }
    });
}


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
        var i = $("#frontWish").attr('name');
        if (i <= 1) {
            i = pageSize + 1;
        }
        i--;
        getWish(i,1)
    });
    $("#nextWish").click(function () {
        var i = $("#nextWish").attr('name');
        if (i >= pageSize) {
            i = 0;
        }
        i++;
        $("#jishi").attr('src', "./powerview/幻灯片" + i + ".jpg");
        $("#nextOpt").attr('name', i);
        getWish(i,1)

    });


    $("#addWishClick").click(function () {
        var value = $("#input").val();
        if (value) {
            submitWish(value,'郑梦婷');
        }
    });







});