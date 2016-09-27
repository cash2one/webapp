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

function getByClass(sClass){
    var aResult=[];
    var aEle=document.getElementsByTagName('*');

    for(var i=0;i<aEle.length;i++){
        /*将每个className拆分*/
        var arr=aEle[i].className.split(/\s+/);
        for(var j=0;j<arr.length;j++){
            /*判断拆分后的数组中有没有满足的class*/
            if(arr[j]==sClass){
                aResult.push(aEle[i]);
            }
        }
    }
    return aResult;
}

function pass_para_popup_link(passed){
    passed = JSON.parse(passed);
    console.log(passed);
    var insuranceTypeArr=[];
    for (var item in passed.insurance_type) {
        insuranceTypeArr.push(item);
    }
    var insuranceType=insuranceTypeArr.join();
    console.log(passed.mobile);
    var uri ="xiansuoInfo.html?name="+passed.name+"&city="+passed.city+"&province="+passed.province+"&id="+passed.id+"&last_browse_time="+passed.last_browse_time+"&insurance_type="+insuranceType+"&browse_count="+passed.browse_count+"&age="+passed.age+"&sex="+passed.sex+
        "&mobile="+passed.mobile+"&is_contact="+passed.is_contact+"&area="+passed.area+"&user_clue_id="+passed.user_clue_id;
    uri = encodeURI(uri);
    window.location.href = uri;
}

//window.onload=function(){
Zepto(function($){
    /*var URL="https://brokeraid.100credit.com/";*/         //测试
    //var URL="http://192.168.162.192:8080/minions/";  //108
	var URL = "https://brotest.100credit.com/";
    var currentPage=1;
    var pageSize=8;

    //筛选-险种-选中状态
    $(".xianzhong ul li").click(function(){
        if($(this).hasClass("checked")){
            $(this).removeClass("checked");
        }else{
            $(this).addClass("checked");
        }
    });
    //确定--重新登录
    $(".finish_sure").click(function(){
        location.href="login.html";
    });

    //筛选
    $(".filter").click(function(){
        $(".bg_filter").css("display","block");
        //获取省份
        $.ajax({
            url: URL+"saleCule/province.action",
            type: "get",
            dataType : 'jsonp',
            success: function(data) {
                if(typeof data == 'string'){
                    var data = JSON.parse(data);
                }
                if(data.code==715){
                    console.log("session为空,请重新登录");
                    $(".bg").css("display","block");
                    $(".content_sessionNull").css("display","block");
                    localStorage.removeItem("uid");
                    localStorage.removeItem("upwd");
                    localStorage.removeItem("flag");
                    localStorage.removeItem("sid");
                    localStorage.removeItem("device_id");
                }else if(data.code==718){
                    console.log("您的账号已在其他设备上登录");
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
                $('.sheng li').remove();
                var data_list=data.data.provinceList;
                for(var i=0;i<data_list.length;i++){
                    var l=document.createElement('li');//创建一个li
                    $('.sheng').append(l);
                    l.innerHTML=data_list[i].province;
                    l.setAttribute("data-id",data_list[i].provinceID);
                    l.onclick=function(){
                        $(this).addClass("checked_area").siblings().removeClass("checked_area");
                        var provinceID=$(this).attr("data-id");
                        //根据省份id获取城市
                        var params={
                            provinceID:provinceID
                        };
                        $.ajax({
                            url: URL+"saleCule/city.action",
                            type: "get",
                            data: params,
                            dataType : 'jsonp',
                            success: function(data) {
                                if(typeof data == 'string'){
                                    var data = JSON.parse(data);
                                }
                                if(data.code==715){
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
                                $('.shi li').remove();
                                var data_list=data.data.cityList;
                                for(var i=0;i<data_list.length;i++){
                                    var l=document.createElement('li');//创建一个li
                                    $('.shi').append(l);
                                    l.innerHTML=data_list[i].city;
                                    l.setAttribute("data-id",data_list[i].cityID);
                                    l.onclick=function(){
                                        $(this).addClass("checked_area").siblings().removeClass("checked_area");
                                        var cityID=$(this).attr("data-id");
                                        //根据城市id获取区县！！！！！本期不显示区县！！！！！！！
                                        //var params={
                                        //    cityID:cityID
                                        //};
                                        //$.ajax({
                                        //    url: URL+"saleCule/area.action",
                                        //    type: "get",
                                        //    data: params,
                                        //    dataType : 'jsonp',
                                        //    success: function(data) {
                                        //        if(typeof data == 'string'){
                                        //            var data = JSON.parse(data);
                                        //        }
                                        //        $('.qu li').remove();
                                        //        var data_list=data.data.areaList;
                                        //        for(var i=0;i<data_list.length;i++){
                                        //            var l=document.createElement('li');//创建一个li
                                        //            $('.qu').append(l);
                                        //            l.innerHTML=data_list[i].area;
                                        //            l.setAttribute("data-id",data_list[i].areaID);
                                        //            l.onclick=function(){
                                        //                $(this).addClass("checked_area").siblings().removeClass("checked_area");
                                        //                var areaID=$(this).attr("data-id");
                                        //            }
                                        //        }
                                        //    }
                                        //})
                                    }
                                }
                            }
                        })
                    }
                }
            }
        });
    });
    //筛选---取消
    $(".cancel").click(function(){
        $(".bg_filter").css("display","none");
    });
    //722内部错误---取消
    $(".cancel_contact").click(function(){
        $(".bg").css("display","none");
        $(".content_contact").css("display","none");
    });
    //确定--根据筛选条件查询线索列表
    $(".confirm").click(function(){
        var area,
            city,
            insurance_type,
            province;
        //省份名称province
        $(".sheng").find("li").each(function(){
            if($(this).hasClass("checked_area")){
                province=$(this).text();
            }
        });
        //城市名称city
        $(".shi").find("li").each(function(){
            if($(this).hasClass("checked_area")){
                city=$(this).text();
            }
        });
        //区县名称area
        $(".qu").find("li").each(function(){
            if($(this).hasClass("checked_area")){
                area=$(this).text();
            }
        });
        //险种
        var arr=[];
        $(".xianzhong ul li").each(function(){
            if($(this).hasClass("checked")){
                var baoxian=$(this).text();
                arr.push(baoxian);
            }
        });
        insurance_type=arr.join();
        if(typeof province=='undefined'||typeof city=='undefined'||insurance_type.length==0){
            //alert("请选择地区或险种")
            $(".bg_content_nochecked").css("display","block");
            $(".finish_queding").click(function(){
                $(".bg_content_nochecked").css("display","none");
            })
        }else{
            location.href=encodeURI("saleXiansuo.html?area="+area+"&city="+city+"&insurance_type="+insurance_type+"&province="+province);
        }
    });
    var url=decodeURI(window.location.href);
    //console.log('url',url);
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
    if(canshu.insurance_type){
        $(".bg_filter").css("display","none");
        //点击筛选按钮查询
        var params={
            area:canshu.area,
            city:canshu.city,
            insurance_type:canshu.insurance_type,
            province:canshu.province
        };
        $.ajax({
            url: URL + "saleCule/touchSelect.action",
            type: "get",
            data:params,
            dataType: 'jsonp',
            success: function (data) {
                if (typeof data == 'string') {
                    var data = JSON.parse(data);
                }
                if(data.code==1){
                    //获取上次所选的地区和险种
                    $.ajax({
                        url:URL+"saleCule/userSelect.action",
                        type:"get",
                        dataType:"jsonp",
                        success:function(data){
                            if(typeof data == 'string'){
                                var data = JSON.parse(data);
                            }
                            if(data.code==1){
                                var data_list=data.data.brUserSelect;
                                $(".province").html(data_list.province);
                                $(".city").html(data_list.city);
                                $(".area").html(data_list.area);
                                var str=data_list.ins_type;
                                var strs=str.split(",");
                                var x=0;
                                for(var i=0;i<strs.length;i++) {
                                    if(x>2){
                                        break;
                                    }
                                    var l = document.createElement('li');//创建一个li
                                    $('.guanzhu_baoxian').append(l);
                                    l.innerHTML = strs[i];
                                    x++;
                                }
                                var params={
                                    area:data_list.area,
                                    city:data_list.city,
                                    insurance_type:data_list.ins_type,
                                    province:data_list.province,
                                    currentPage:currentPage,
                                    pageSize:pageSize
                                };
                                $.ajax({
                                    url:URL+"saleCule/getList.action",
                                    type:"get",
                                    data:params,
                                    dataType:'jsonp',
                                    success:function(data){
                                        if(typeof data == 'string'){
                                            var data = JSON.parse(data);
                                        }
                                        if(data.code==1){
                                            var data_list=data.data.brSaleClueList;
                                            //console.log(data_list)
                                            if(data_list.length==0){
                                                $(".data_kong").css("display","block");
                                            }
                                            for(var i=0;i<data_list.length;i++){
                                                var l=document.createElement('li');//创建一个li
                                                var content=$(".info_list").html();
                                                l.innerHTML=content;
                                                l.setAttribute("data-id",data_list[i].id);
                                                data_list[i].insurance_type = JSON.parse(data_list[i].insurance_type);
                                                //l.onclick=function(){
                                                //    var id=$(this).attr("data-id");
                                                //    window.location.href=encodeURI("xiansuoInfo.html?city="+city
                                                //    +"&insurance_type="+insurance_type
                                                //    +"&province="+province
                                                //    +"&id="+id
                                                //    +"&last_browse_time="+last_browse_time
                                                //    +"&name="+name
                                                //    +"&browse_count="+browse_count);
                                                //};
                                                var stringObj=JSON.stringify(data_list[i]);
                                                l.onclick = new Function("pass_para_popup_link('" + stringObj + "');");
                                                $('#thelist').append(l);
                                                if(data_list[i].name==""){
                                                    l.getElementsByTagName('div')[2].innerHTML="客户";
                                                    var tel=data_list[i].mobile;
                                                    l.getElementsByTagName('span')[0].innerHTML=tel.substring(0,3)+' '+'****'+' '+tel.substring(7,11);
                                                }else{
                                                    l.getElementsByTagName('div')[2].innerHTML=data_list[i].name;
                                                    l.getElementsByTagName('span')[0].innerHTML="";
                                                }
                                                l.getElementsByTagName('div')[5].innerHTML=data_list[i].last_browse_time;
                                                //var jsonobj=JSON.parse(data_list[i].insurance_type);
                                                var jsonobj=data_list[i].insurance_type;
                                                //console.log('jsonobj',jsonobj,i)
                                                var j = 0;
                                                for(var key in jsonobj){
                                                    if(j >= 3){
                                                        break;
                                                    }
                                                    $(l).find('.baoxian_show').append('<li>' + key + '</li>');
                                                    console.log("aaa")
                                                    j++;
                                                }
                                            }
                                            loaded();
                                        }else if(data.code==2){
                                            console.log("失败")
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
                }else if(data.code==2){
                    console.log("失败")
                }else if(data.code==722){
                    console.log("内部错误");
                    $(".bg").css("display","block");
                    $(".content_contact").css("display","block");
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
                }
            }
        });
    }else{
        //获取上次所选的地区和险种
        $.ajax({
            url:URL+"saleCule/userSelect.action",
            type:"get",
            dataType:"jsonp",
            success:function(data){
                if(typeof data == 'string'){
                    var data = JSON.parse(data);
                }

                if(data.code==1){
                    var data_list=data.data.brUserSelect;
                    $(".province").html(data_list.province);
                    $(".city").html(data_list.city);
                    $(".area").html(data_list.area);
                    var str=data_list.ins_type;
                    var strs=str.split(",");
                    var x=0;
                    for(var i=0;i<strs.length;i++) {
                        if(x>2){
                            break;
                        }
                        var l = document.createElement('li');//创建一个li
                        $('.guanzhu_baoxian').append(l);
                        l.innerHTML = strs[i];
                        x++;
                    }
                    var params={
                        area:data_list.area,
                        city:data_list.city,
                        insurance_type:data_list.ins_type,
                        province:data_list.province,
                        currentPage:currentPage,
                        pageSize:pageSize
                    };
                    $.ajax({
                        url:URL+"saleCule/getList.action",
                        type:"get",
                        data:params,
                        dataType:'jsonp',
                        success:function(data){
                            if(typeof data == 'string'){
                                var data = JSON.parse(data);
                            }
                            if(data.code==1){
                                var data_list=data.data.brSaleClueList;
                                //console.log(data_list)
                                if(data_list.length==0){
                                    $(".data_kong").css("display","block");
                                }
                                for(var i=0;i<data_list.length;i++){
                                    var l=document.createElement('li');//创建一个li
                                    var content=$(".info_list").html();
                                    l.innerHTML=content;
                                    l.setAttribute("data-id",data_list[i].id);
                                    data_list[i].insurance_type = JSON.parse(data_list[i].insurance_type);
                                    //l.onclick=function(){
                                    //    var id=$(this).attr("data-id");
                                    //    window.location.href=encodeURI("xiansuoInfo.html?city="+city
                                    //    +"&insurance_type="+insurance_type
                                    //    +"&province="+province
                                    //    +"&id="+id
                                    //    +"&last_browse_time="+last_browse_time
                                    //    +"&name="+name
                                    //    +"&browse_count="+browse_count);
                                    //};
                                    var stringObj=JSON.stringify(data_list[i]);
                                    l.onclick = new Function("pass_para_popup_link('" + stringObj + "');");
                                    $('#thelist').append(l);
                                    if(data_list[i].name==""){
                                        l.getElementsByTagName('div')[2].innerHTML="客户";
                                        var tel=data_list[i].mobile;
                                        l.getElementsByTagName('span')[0].innerHTML=tel.substring(0,3)+' '+'****'+' '+tel.substring(7,11);
                                    }else{
                                        l.getElementsByTagName('div')[2].innerHTML=data_list[i].name;
                                        l.getElementsByTagName('span')[0].innerHTML="";
                                    }
                                    l.getElementsByTagName('div')[5].innerHTML=data_list[i].last_browse_time;
                                    //var jsonobj=JSON.parse(data_list[i].insurance_type);
                                    var jsonobj=data_list[i].insurance_type;
                                    //console.log('jsonobj',jsonobj,i)
                                    var j = 0;
                                    for(var key in jsonobj){
                                        if(j >= 3){
                                            break;
                                        }
                                        $(l).find('.baoxian_show').append('<li>' + key + '</li>');
                                        j++;
                                    }
                                }
                                loaded();
                            }else if(data.code==2){
                                console.log("失败")
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
                }else if(data.code==756){
                    //第一次的登录则先筛选地区、险种
                    $(".bg_filter").css("display","block");
                    //第一次的登录险种默认值前三个
                    $(".xianzhong ul").find("li").each(function(k){
                        if(k<3){
                            $(this).addClass("checked");
                        }
                    });
                    //获取省份
                    $.ajax({
                        url: URL+"saleCule/province.action",
                        type: "get",
                        dataType : 'jsonp',
                        success: function(data) {
                            if(typeof data == 'string'){
                                var data = JSON.parse(data);
                            }
                            if(data.code==715){
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
                            $('.sheng li').remove();
                            var data_list=data.data.provinceList;
                            for(var i=0;i<data_list.length;i++){
                                var l=document.createElement('li');//创建一个li
                                $('.sheng').append(l);
                                l.innerHTML=data_list[i].province;
                                l.setAttribute("data-id",data_list[i].provinceID);
                                //默认地区-省-北京市
                                var provinceID01;
                                $(".sheng").find("li").each(function(s){
                                    //if($(this).html()=="北京市"){
                                    //    $(this).addClass("checked_area");
                                    //    provinceID01=$(this).attr("data-id");
                                    //}
                                    if(s===0){
                                        $(this).addClass("checked_area");
                                        provinceID01=$(this).attr("data-id");
                                    }
                                });
                                //根据省上海id获取上海市
                                var params={
                                    provinceID:provinceID01
                                };
                                $.ajax({
                                    url: URL+"saleCule/city.action",
                                    type: "get",
                                    data: params,
                                    dataType : 'jsonp',
                                    success: function(data) {
                                        if(typeof data == 'string'){
                                            var data = JSON.parse(data);
                                        }
                                        if(data.code==715){
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
                                        $('.shi li').remove();
                                        var data_list=data.data.cityList;
                                        for(var i=0;i<data_list.length;i++){
                                            var l=document.createElement('li');//创建一个li
                                            $('.shi').append(l);
                                            l.innerHTML=data_list[i].city;
                                            l.setAttribute("data-id",data_list[i].cityID);
                                            //默认值-城市-北京市
                                            $(".shi").find("li").each(function(sh){
                                                //if($(this).html()=="北京市"){
                                                //    $(this).addClass("checked_area");
                                                //}
                                                if(sh===0){
                                                    $(this).addClass("checked_area");
                                                }
                                            });
                                            l.onclick=function(){
                                                $(this).addClass("checked_area").siblings().removeClass("checked_area");
                                                var cityID=$(this).attr("data-id");
                                            }
                                        }
                                    }
                                });


                                l.onclick=function(){
                                    $(this).addClass("checked_area").siblings().removeClass("checked_area");
                                    var provinceID=$(this).attr("data-id");
                                    //根据省份id获取城市
                                    var params={
                                        provinceID:provinceID
                                    };
                                    $.ajax({
                                        url: URL+"saleCule/city.action",
                                        type: "get",
                                        data: params,
                                        dataType : 'jsonp',
                                        success: function(data) {
                                            if(typeof data == 'string'){
                                                var data = JSON.parse(data);
                                            }
                                            if(data.code==715){
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
                                            $('.shi li').remove();
                                            var data_list=data.data.cityList;
                                            for(var i=0;i<data_list.length;i++){
                                                var l=document.createElement('li');//创建一个li
                                                $('.shi').append(l);
                                                l.innerHTML=data_list[i].city;
                                                l.setAttribute("data-id",data_list[i].cityID);
                                                l.onclick=function(){
                                                    $(this).addClass("checked_area").siblings().removeClass("checked_area");
                                                    var cityID=$(this).attr("data-id");
                                                    //根据城市id获取区县！！！！！本期不显示区县！！！！！！！
                                                    //var params={
                                                    //    cityID:cityID
                                                    //};
                                                    //$.ajax({
                                                    //    url: URL+"saleCule/area.action",
                                                    //    type: "get",
                                                    //    data: params,
                                                    //    dataType : 'jsonp',
                                                    //    success: function(data) {
                                                    //        if(typeof data == 'string'){
                                                    //            var data = JSON.parse(data);
                                                    //        }
                                                    //        $('.qu li').remove();
                                                    //        var data_list=data.data.areaList;
                                                    //        for(var i=0;i<data_list.length;i++){
                                                    //            var l=document.createElement('li');//创建一个li
                                                    //            $('.qu').append(l);
                                                    //            l.innerHTML=data_list[i].area;
                                                    //            l.setAttribute("data-id",data_list[i].areaID);
                                                    //            l.onclick=function(){
                                                    //                $(this).addClass("checked_area").siblings().removeClass("checked_area");
                                                    //                var areaID=$(this).attr("data-id");
                                                    //            }
                                                    //        }
                                                    //    }
                                                    //})
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    });
                }
            }
        });
    }
});