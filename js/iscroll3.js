var myScroll,pullUpEl, pullUpOffset,

    generatedCount = 0;

/*var URL="https://brokeraid.100credit.com/";*/  //测试
//var URL="http://192.168.162.108:8080/minions/";//108
var URL = "https://brotest.100credit.com/";

function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    //pullDownEl = document.getElementById('pullDown');
    //pullDownOffset = pullDownEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        useTransition: true,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                //<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...'; -->
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                //<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...'; -->
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                //<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...'; -->
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                /* pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...'; */
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });

    if(document.getElementById('wrapper')){
        document.getElementById('wrapper').style.left = '0';
    }

    /* setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 10); */
}

//pageNo = 1;

function pullUpAction (t) {
    //pageNo += 1;
    console.log(Math.random(),'pullUpAction');

    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var el, li;
        var pageNo;
        el = document.getElementById('thelist');
        //if (start == "false") {
        //    pageNo=(document.getElementById('thelist').children.length-1)/8+1;
        //}
        //console.info(el.children.length);
       pageNo=Math.floor((document.getElementById('thelist').children.length-1)/8)+1;
        //console.warn(pageNo);
        if(parseInt(pageNo)!=pageNo){
            document.getElementById('pullUp').style.display="none";
            return;
        }

        var pageSize=8;
        var params={
            page:pageNo,
            rows:pageSize
        };
        if(pageNo<=7){
        var text=document.getElementById("title").innerHTML;
        if(text=="账户"){
            $.ajax({
                url:URL+"brAccount/getAccountList.action",
                type:"get",
                data: params,
                dataType:"jsonp",
                success:function(data){
                    if(typeof data == 'string'){
                        var data = JSON.parse(data);
                    }
                    $('.zhanghu_info li').css({"display":"none"});
                    if(data.code == 741){
                        var data_list=data.data.rows;
                        for(var i=0;i<data_list.length;i++){
                            var l=document.createElement('li');//创建一个li
                            var aaa=$(".zhanghu_list").html();
                            l.innerHTML=aaa;
                            l.className="zhanghu_list";
                            $('.zhanghu_info').append(l);
                            l.getElementsByTagName('p')[0].innerHTML=data_list[i].type;
                            l.getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerHTML=data_list[i].create_time;
                            if(data_list[i].money<0){
                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].money;
                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_jian";
                            }else{
                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].money;
                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_add";
                            }
                        }
                    }else if(data.code==742){
                        console.log("查询账户列表失败")
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
        }else if(text=="积分"){

            $.ajax({
                url:URL+"brAccount/getIntegralList.action",
                type:"get",
                data: params,
                dataType:"jsonp",
                success:function(data){
                    if(typeof data == 'string'){
                        var data = JSON.parse(data);
                    }
                    $('.zhanghu_info li').css({"display":"none"});
                    if(data.code == 743){
                        var data_list=data.data.rows;
                        for(var i=0;i<data_list.length;i++){
                            var l=document.createElement('li');//创建一个li
                            var aaa=$(".zhanghu_list").html();
                            l.innerHTML=aaa;
                            l.className="zhanghu_list";
                            $('.zhanghu_info').append(l);
                            l.getElementsByTagName('p')[0].innerHTML=data_list[i].integral_type;
                            l.getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerHTML=data_list[i].create_time;
                            if(data_list[i].money<0){
                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].integral;
                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_jian";
                            }else{
                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].integral;
                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_add";
                            }
                        }
                    }else if(data.code==744){
                        console.log("查询积分列表失败")
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