var myScroll,pullUpEl, pullUpOffset,

    generatedCount = 0;

/*var URL="https://brokeraid.100credit.com/";*/  //测试
//var URL="http://192.168.162.108:8080/minions/";//108
var URL = "https://brotest.100credit.com/";

function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    var arr = [];
    var currentY;
    myScroll = new iScroll('wrapper', {
        useTransition: true,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                //<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...'; -->
            }else if(pullDownEl.className.match('loading')){
                pullDownEl.className = '';
                //pullDownEl.style.display="block";
                //pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新111...';
            }
        },
        onScrollMove: function (evt) {
            arr.push(evt.clientY);
            //console.log(evt);
            //console.info(currentY,evt.clientY);
            //currentY = evt.clientY;
            //var arr = Array.prototype.slice.call(arguments);
            //console.info(arr);

            console.log('onScrollMove',this.y,this.maxScrollY);
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')){
                pullUpEl.className = 'flip';
                //<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...'; -->
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')){
                pullUpEl.className = '';
                //<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...'; -->
                this.maxScrollY = pullUpOffset;
            }else if(this.y > 5 && !pullDownEl.className.match('flip')){
                pullDownEl.className = 'flip';
                pullDownEl.style.display="block";
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '<img src="images/refresh01.png"> 下拉刷新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')){
                pullDownEl.className = '';
                this.minScrollY = -pullDownOffset;
            }
        },
        onScrollEnd: function () {
            //console.log(arr);
            var z = arr[arr.length-1];
            var y = arr[arr.length-2];
            arr.length = 0;
            //console.log(arr);
            if(z > y){
                console.log('xia');
                //刷新
                //先记录一个当前值
                //ajax请求回填数据
                //var page=(document.getElementById('thelist').children.length-1)/8+1;
                //pullUpAction(page);
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '开始刷新3333333...';
                location.reload();
                //document.URL=location.href;
                //pullUpAction("true");
                //pullDownEl.style.display="none";
            }else{
                console.log('shang');
                //记录当前值
                //ajax请求回填列表
                pullUpAction("false");
            }
            //console.log('onScrollEnd');
            //debugger;
            //if (pullUpEl.className.match('flip')) {
            //    pullUpEl.className = 'loading';
            //    /* pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...'; */
            //    pullUpAction("false");	// Execute custom function (ajax call?)
            //}else if(pullDownEl.className.match('flip')){
            //    pullDownEl.className = 'loading';
            //    pullDownEl.querySelector('.pullDownLabel').innerHTML = '开始刷新3333...';
            //    console.log("sssssss")
            //
            //    location.reload();
            //
            //    pullDownEl.style.display="none";
            //    pullUpAction("true"); // Execute custom function (ajax call?)
            //}
        }
    });

    if(document.getElementById('wrapper')){
        document.getElementById('wrapper').style.left = '0';
    }

    /* setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 10); */
}



function pullUpAction (start) {

    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var el, li;
        var pageNo;
        el = document.getElementById('thelist');
        if (start == "false") {
            pageNo=(document.getElementById('thelist').children.length-1)/8+1;
        }

        //var pageNo=(document.getElementById('thelist').children.length-1)
        //    /8+1;

        if(parseInt(pageNo)!=pageNo){
            document.getElementById('pullUp').style.display="none";
            return;
        }

        var pageSize=8;
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
                                                    var data_list=data.data.brSaleClueList;
                                                    //console.log(data_list)
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
                                                        }else{
                                                            l.getElementsByTagName('div')[2].innerHTML=data_list[i].name;
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
                                                    alert("程序似乎出了点问题，程序员君在玩命修复中...")
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
                                        alert("程序似乎出了点问题，程序员君在玩命修复中...")
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
                            alert("程序似乎出了点问题，程序员君在玩命修复中...")
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
                                        var data_list=data.data.brSaleClueList;
                                        //console.log(data_list)
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
                                            }else{
                                                l.getElementsByTagName('div')[2].innerHTML=data_list[i].name;
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
                                        alert("程序似乎出了点问题，程序员君在玩命修复中...")
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
                            alert("程序似乎出了点问题，程序员君在玩命修复中...")
                        }
                    }
                });
            }
        }



    }, 20);	// <-- Simulate network congestion, remove setTimeout from production!
}



document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 100); }, false);