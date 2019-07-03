var container;

// 可选颜色
var colors = ['#96C2F1', '#BBE1F1', '#E3E197', '#F8B3D0', '#FFCC00'];
var wishSize;

//创建许愿页
var createItem = function (text, name, time) {
    var color = colors[parseInt(Math.random() * 5, 10)]
    container.html("");
    $('<div class="item"><p><br/>&nbsp;&nbsp;&nbsp;&nbsp;' + text + '</p><p class="wishname">By&nbsp;&nbsp;&nbsp;&nbsp;' + name + '</p><p class="wishtime">' + time + '</p></div>').css({'background': color}).appendTo(container);
};

//判断字符是否为空的方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}


// 初始化
var init = function () {
    container = $('#container');
    getWish(1, 1);
    getSize();
}


function getSize() {
    $.ajax({
        type: 'POST',
        url: "https://www.charleymot.com/server/petal/getWishSize",
        cache: false,
        data: {},
        async: true,
        success: function (data) {
            if (data.code == 200) {
                wishSize = data.data;
            } else {
                alert(data.message);
            }
        },
        error: function (e) {
            console.log(e);
            alert("网络通信失败" + e);
        }
    });
}

function submitWish(desc, name) {

    $.ajax({
        type: 'POST',
        url: "https://www.charleymot.com/server/petal/wish",
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

function getWish(pageSize, pageNum) {
    $.ajax({
        type: 'POST',
        url: "https://www.charleymot.com/server/petal/getWish",
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
        getSize();
        var i = $("#frontWish").attr('name');
        if (i <= 1) {
            i = wishSize + 1;
        }
        i--;
        $("#frontWish").attr('name', i);
        $("#nextWish").attr('name', i);
        getWish(1, i)
    });
    $("#nextWish").click(function () {
        getSize();
        var i = $("#nextWish").attr('name');
        if (i >= wishSize) {
            i = 0;
        }
        i++;
        $("#frontWish").attr('name', i);
        $("#nextWish").attr('name', i);
        getWish(1, i)

    });


    $("#addWishClick").click(function () {
        getSize();
        var value = $("#input").val();
        var name = $("#wishname").val();
        if (isEmpty(value)) {
            alert("请输入心愿")
        } else if (isEmpty(name)) {
            alert("请输入姓名")
        } else {
            submitWish(value, name);
        }
    });


});