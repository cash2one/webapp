var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
/*var URL="https://brokeraid.100credit.com/";*/         //测试
//var URL="http://192.168.162.192:8080/minions/";//108
var URL = "https://brotest.100credit.com/";
var count = 1;
var type;
function pullDownAction () {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        pullUpAction();
        myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 100);	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        var pageNo;
        var pageSize=8;
        el = document.getElementById('thelist');
        pageNo=(document.getElementById('thelist').children.length-1)/8+1;
        if(parseInt(pageNo)!=pageNo){
            document.getElementById('pullUp').style.display="none";
            return;
        }
        if(pageNo<=7){
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
                                        $('.guanzhu_baoxian li').remove();
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
                                            currentPage:pageNo,
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
                                                    if(type==1){
                                                        $('#thelist').html($('#thelist li').eq(0));
                                                    }
                                                    var data_list=data.data.brSaleClueList;
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
                                                }
                                                else if(data.code==722){
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
                            $('.guanzhu_baoxian li').remove();
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
                                currentPage:pageNo,
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
                                        if(type==1){
                                            $('#thelist').html($('#thelist li').eq(0));
                                        }
                                        var data_list=data.data.brSaleClueList;
                                        console.log(data_list.length)
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
                                    myScroll.refresh();
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
            }
        }


        myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 100);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    var count = 0;
    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                //pullDownEl.querySelector('.pullDownLabel').innerHTML = '<img src="images/refresh02.png"> 下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                //pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '<img src="images/refresh01.png"> 下拉刷新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                //pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新NO2222...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                //pullUpEl.querySelector('.pullUpLabel').innerHTML = '下拉刷新NO333333...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                //pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                count++;
                //console.log(11)
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '<img src="images/refresh02.png"> 下拉刷新...';
                type=1;
                pullDownAction();	// Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                if(count == 1){return}
                //console.log(22)
                pullUpEl.className = 'loading';
                //pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                type=2;
               pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 100);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

//document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);