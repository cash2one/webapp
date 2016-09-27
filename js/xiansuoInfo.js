//屏幕显示
var c=window.screen.width;
if(c!=720){
    if(c>720){
        var prt=0.5;
    }else{
        var prt=c/720;
    }
}else{
    var prt=0.5;
}
document.write('<meta name="viewport" content="width=device-width, initial-scale='+prt+', maximum-scale='+prt+', minimum-scale='+prt+'" />');
Zepto(function($){
    $(".back").click(function(){
        window.history.back();
    });

    /*var URL = "https://brokeraid.100credit.com/";*/   //测试
    //var URL="http://192.168.162.192:8080/minions/";    //192
	var URL = "https://brotest.100credit.com/";
    //抢单遮罩高度
    var height_bg = document.documentElement.scrollHeight;
    $(".bg").css({height: height_bg});
    //是否同意条款
    //$(".agreed").click(function(){
    //    if(!$(".agreed").is(':checked')){
    //        $(".qiang").addClass("qiang_disabled");
    //        $(".qiang").attr("disabled", true);
    //    }else{
    //        $(".qiang").removeClass("qiang_disabled");
    //        $(".qiang").removeAttr("disabled");
    //    }
    //});
    //用户账户余额和抢单所需助理币
    $.ajax({
        url: URL + "saleCule/userCurrency.action",
        type: "get",
        dataType: 'jsonp',
        success: function (data) {
            if (typeof data == 'string') {
                var data = JSON.parse(data);
            }
            try{
                var data_list = data.data;
                if (data_list.type == 1) {
                    $(".chongzhi").css("display", "none");
                    $(".qiang").removeClass("qiang_disabled");
                    $(".qiang").removeAttr("disabled");
                }else if (data_list.type == 0) {
                    $(".chongzhi").css("display", "block");
                    $(".qiang").addClass("qiang_disabled");
                    $(".qiang").attr("disabled", true);
                }
            }catch(e){}
            if(data.code==1){
                $(".yu_money").html(data_list.balance);
                $(".order_money").html(Math.abs(data_list.payGrab));
            }else if(data.code==715){
                console.log("session为空,请重新登录");
                $(".bg").css("display","block");
                $(".content_sessionNull").css("display","block");
                localStorage.removeItem("uid");
                localStorage.removeItem("upwd");
                localStorage.removeItem("flag");
                localStorage.removeItem("sid");
                localStorage.removeItem("device_id");
            }else if(data.code==718){
                console.log("您的账号已在其他设备上登陆");
                $(".bg").css("display","block");
                $(".content_other").css("display","block");
                localStorage.removeItem("uid");
                localStorage.removeItem("upwd");
                localStorage.removeItem("flag");
                localStorage.removeItem("sid");
                localStorage.removeItem("device_id");
            }else if(data.code==722){
                console.log("内部错误");
                $(".bg").css("display","block");
                $(".content_contact").css("display","block");
            }
        }
    });

    var url=decodeURI(window.location.href);
    function urlToJson(url){
        if(!(/\?/g.test(url))) return {};
        var obj = {};
        var str=url.split("?");
        var str01=str[1].split("&");
        for (var i=0;i<str01.length;i++){
            var temp = str01[i].split('=');
            obj[temp[0]] =  temp[1];
        }
        return obj
    }
    var canshu=urlToJson(url);
    console.log(canshu);
    var name=canshu.name;
    var province=canshu.province;
    var city=canshu.city;
    var area=canshu.area;
    var insurance_type=canshu.insurance_type;
    var browse_count=canshu.browse_count;
    var last_browse_time=canshu.last_browse_time;
    var age=canshu.age;
    var sex=canshu.sex;
    var id=canshu.id;
    if(name==""){
        $(".username").html("客户");
    }else{
        $(".username").html(name);
    }
    $(".old").html(age);
    $(".province_info").html(province);
    $(".city_info").html(city);
    $(".browse_count").html(browse_count);
    $(".date").html(last_browse_time);

    var arr_insurance_type=insurance_type.split(",");
    var j=0;
    for(var i=0;i<arr_insurance_type.length;i++){
        if(j>=3){
            break;
        }
        var l_01 = document.createElement('li');//创建一个li
        $('.baoxian_info').append(l_01);
        l_01.innerHTML = arr_insurance_type[i];
        j++;
    }

    //传销售线索详情页参数
    var is_contact=canshu.is_contact;
    var mobile=canshu.mobile;
    $(".tel").html(mobile.substring(0,3)+' '+'****'+' '+mobile.substring(7,11));
    //抢单成功--点击完成
    var user_clue_id;
    $(".finish").click(function(){
        location.href="salesLeadsInfo.html?is_contact="+is_contact+"&mobile="+mobile+"&province="+province+"&city="+city+"&area="+area+"&browse_count="+browse_count+"&last_browse_time="+last_browse_time+"&name="+name+"&insurance_type="+insurance_type+"&user_clue_id="+user_clue_id;
    });
    //抢单失败--点击完成
    $(".finish_fail").click(function(){
        location.href="saleXiansuo.html";
    });
    //抢单失败--助理币不足--点击充值
    $(".recharge").click(function(){
        $(".bg").css("display","none");
        $(".content_recharge").css("display","none");
    });
    //抢单失败--助理币不足--点击取消
    $(".cancel01").click(function(){
        $(".bg").css("display","none");
        $(".content_recharge").css("display","none");
    });
    //确定--重新登录
    $(".finish_sure").click(function(){
        location.href="login.html";
    });
    //722内部错误---取消
    $(".cancel_contact").click(function(){
        $(".bg").css("display","none");
        $(".content_contact").css("display","none");
    });
    $(".qiang").one("click",function(){
        var params={
            id:id
        };
        $.ajax({
            url: URL+"saleCule/grab.action",
            type: "get",
            data: params,
            dataType : 'jsonp',
            success: function(data) {
                if(typeof data == 'string'){
                    var data = JSON.parse(data);
                }
                if(data.code==1){
                    console.log("成功");
                    $(".bg").css("display","block");
                    $(".content_success").css("display","block");
                    user_clue_id=data.user_clue_id;
                    //console.log(user_clue_id);
                }else if(data.code==2){
                    console.log("失败");
                    //$(".bg").css("display","block");
                    //$(".content_fail").css("display","block");
                }else if(data.code==4){
                    console.log("参数错误");
                }else if(data.code==5){
                    console.log("助理币不足");
                    $(".bg").css("display","block");
                    $(".content_recharge").css("display","block");
                }else if(data.code==6){
                    console.log("线索已被抢");
                    $(".bg").css("display","block");
                    $(".content_fail").css("display","block");
                }else if(data.code==715){
                    console.log("session为空,请重新登录");
                    $(".bg").css("display","block");
                    $(".content_sessionNull").css("display","block");
                    localStorage.removeItem("uid");
                    localStorage.removeItem("upwd");
                    localStorage.removeItem("flag");
                    localStorage.removeItem("sid");
                    localStorage.removeItem("device_id");
                }else if(data.code==718){
                    console.log("您的账号已在其他设备上登陆");
                    $(".bg").css("display","block");
                    $(".content_other").css("display","block");
                    localStorage.removeItem("uid");
                    localStorage.removeItem("upwd");
                    localStorage.removeItem("flag");
                    localStorage.removeItem("sid");
                    localStorage.removeItem("device_id");
                }else if(data.code==722){
                    console.log("内部错误");
                    $(".bg").css("display","block");
                    $(".content_contact").css("display","block");
                }
            }
        })
    });
    //$(".qiang").click(function(){
    //    var params={
    //        id:id
    //    };
    //    $.ajax({
    //        url: URL+"saleCule/grab.action",
    //        type: "get",
    //        data: params,
    //        dataType : 'jsonp',
    //        success: function(data) {
    //            if(typeof data == 'string'){
    //                var data = JSON.parse(data);
    //            }
    //            if(data.code==1){
    //                console.log("成功");
    //                $(".bg").css("display","block");
    //                $(".content_success").css("display","block");
    //                user_clue_id=data.user_clue_id;
    //                //console.log(user_clue_id);
    //            }else if(data.code==2){
    //                console.log("失败");
    //                //$(".bg").css("display","block");
    //                //$(".content_fail").css("display","block");
    //            }else if(data.code==4){
    //                console.log("参数错误");
    //            }else if(data.code==5){
    //                console.log("助理币不足");
    //                $(".bg").css("display","block");
    //                $(".content_recharge").css("display","block");
    //            }else if(data.code==6){
    //                console.log("线索已被抢");
    //                $(".bg").css("display","block");
    //                $(".content_fail").css("display","block");
    //            }else if(data.code==715){
    //                console.log("session为空,请重新登录");
    //                $(".bg").css("display","block");
    //                $(".content_sessionNull").css("display","block");
    //                localStorage.removeItem("uid");
    //                localStorage.removeItem("upwd");
    //                localStorage.removeItem("flag");
    //                localStorage.removeItem("sid");
    //                localStorage.removeItem("device_id");
    //            }else if(data.code==718){
    //                console.log("您的账号已在其他设备上登陆");
    //                $(".bg").css("display","block");
    //                $(".content_other").css("display","block");
    //                localStorage.removeItem("uid");
    //                localStorage.removeItem("upwd");
    //                localStorage.removeItem("flag");
    //                localStorage.removeItem("sid");
    //                localStorage.removeItem("device_id");
    //            }else if(data.code==722){
    //                console.log("内部错误");
    //                $(".bg").css("display","block");
    //                $(".content_contact").css("display","block");
    //            }
    //        }
    //    })
    //});
});