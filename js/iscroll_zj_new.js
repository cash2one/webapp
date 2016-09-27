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
	/*var URL="https://brokeraid.100credit.com/";*/         //测试
	var URL="http://192.168.162.192:8080/minions/";//108
//var URL = "https://brotest.100credit.com/";

    //确定--重新登录
    $(".finish_sure").click(function(){
        location.href="login.html";
    });
    //722内部错误---取消
    $(".cancel_contact").click(function(){
        $(".bg").css("display","none");
        $(".content_contact").css("display","none");
    });
    
    var ind = 0;
      $(".tab_menu li").click(function(){
        $(this).css({"color":"#5d656e","backgroundColor":"#ffffff"})
            .siblings().css({"color":"#ffffff","backgroundColor":"#a4aab0"});
            
        var text=document.getElementById("title").innerHTML;
            
        ind=$(this).index();
        //selectList(ind)
        console.log(ind+"text",text);
        if (ind==0) {
        	$('#thelist').html($('#thelist li').get(0));
        } else{
        	$('#jifenthelist').html($('#jifenthelist li').get(0));
        }
        pullUpAction();
        
     });   
    //selectList(1);
   // selectList(0);
    loaded(); 
    pullUpAction(); 
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;

function pullUpAction () {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        //$(".tab_content>div").eq(ind).removeClass("content_hide").siblings().addClass("content_hide");
        ///if(pageNo<=7){
            var text=document.getElementById("title").innerHTML;
            ///if(text=="账户"){
            if(ind==0){	
            	$('#wrapper').css({"display":"block"});
                $('#wrapper1').css({"display":"none"});
                $('.content_zhulibi').css({"display":"block"});
                $('.content_jifen').css({"display":"none"});
                 
            	$(".wenzi span").text("账户");
            	$(".zhulibi_helpinfo").text("账户消费明细");
            	$(".zhulibi").css({"backgroundImage":"url(images/zhanghu_on.png)"});
            	$(".jifen").css({"backgroundImage":"url(images/jifen_off.png)"});
            	var el, li, i;
		        var pageNo;
		        var pageSize=8;
		        document.getElementById('pullUp').style.display="block";
		        el = document.getElementById('thelist');
		        pageNo=(document.getElementById('thelist').children.length-1)/8+1;
		        console.log(pageNo+"thelist=",document.getElementById('thelist').children.length)
		        if(parseInt(pageNo)!=pageNo){
		            document.getElementById('pullUp').style.display="none";
		            return;
		        }
		        var params={
		            page:pageNo,
		            rows:pageSize
		        };
		        if(pageNo<=7){
	            	console.log("账户",params)
	                $.ajax({
	                    url:URL+"brAccount/getAccountList.action",
	                    type:"get",
	                    data: params,
	                    dataType:"jsonp",
	                    success:function(data){
	                        if(typeof data == 'string'){
	                            var data = JSON.parse(data);
	                        }
	                        
	                        if(data.code == 741){
	                            var data_list=data.data.rows;
	                            for(var i=0;i<data_list.length;i++){
	                                var l=document.createElement('li');//创建一个li
	                                var aaa=$(".zhanghu_list").clone().html();
	                                l.innerHTML=aaa;
	                                l.className="zhanghu_list";
	                                $('#thelist').append(l);
	                                l.getElementsByTagName('p')[0].innerHTML=data_list[i].type;
	                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerHTML=data_list[i].create_time.substring(0,16);
	                                if(data_list[i].money<0){
	                                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].money;
	                                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_jian";
	                                }else{
	                                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].money;
	                                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_add";
	                                }
	                            }
	                            myScroll.refresh();	
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
	                            console.log("内部错误");
	                            $(".bg").css("display","block");
	                            $(".content_contact").css("display","block");
	                        }
	                    }
	                });
	             }   
            ///}else if(text=="积分"){
              }else if(ind==1){	
              	$('#wrapper').css({"display":"none"});
                $('#wrapper1').css({"display":"block"});
                $('.content_zhulibi').css({"display":"none"});
                $('.content_jifen').css({"display":"block"});
                
              	$(".wenzi span").text("积分");
            	$(".zhulibi_helpinfo").text("积分明细");
            	$(".jifen").css({"backgroundImage":"url(images/jifen_on.png)"});
            	$(".zhulibi").css({"backgroundImage":"url(images/zhanghu_off.png)"});
				var el, li, i;
		        var pageNo1;
		        var pageSize=8;
		        document.getElementById('pullUp1').style.display="block";
		        el = document.getElementById('jifenthelist');
		        pageNo1=(document.getElementById('jifenthelist').children.length-1)/8+1;
		        console.log("pageNo1积分",document.getElementById('jifenthelist').children);
		        if(parseInt(pageNo1)!=pageNo1){
		            document.getElementById('pullUp1').style.display="none";
		            return;
		        }
		        var params1={
		            page:pageNo1,
		            rows:pageSize
		        };
		        if(pageNo1<=7){
			        console.log("积分",params1)
	                $.ajax({
	                    url:URL+"brAccount/getIntegralList.action",
	                    type:"get",
	                    data: params1,
	                    dataType:"jsonp",
	                    success:function(data){
	                        if(typeof data == 'string'){
	                            var data = JSON.parse(data);
	                        }
	                        ///$('.zhanghu_info li').css({"display":"none"});
	                         //console.log("--jifenthelist[i]",$('#jifenthelist')[0])
	                         var ell = document.getElementById('wrapper1');
	                    	 var eul = ell.getElementsByTagName("ul")[0];
	                    	 console.log("--====jifenthelist[i]",eul)
	                        if(data.code == 743){
	                            var data_list=data.data.rows;
	                            for(var i=0;i<data_list.length;i++){
	                                var l=document.createElement('li');//创建一个li
	                                //var aaa=$(".zhanghu_list").clone().html();
	                                var aaa=$("#jifenlist").clone().html();
	                                l.innerHTML=aaa;
	                                l.className="zhanghu_list";
	                                //$('#jifenthelist').append(l);
	                                //el.appendChild(l, el.childNodes[0]);
	                                eul.appendChild(l);
	                                console.log("ssss jifenthelist[i]",eul)
	                                l.getElementsByTagName('p')[0].innerHTML=data_list[i].integral_type;
	                                l.getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerHTML=data_list[i].create_time.substring(0,16);
	                                if(data_list[i].money<0){
	                                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].integral;
	                                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_jian";
	                                }else{
	                                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].integral;
	                                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_add";
	                                }
	                            }
	                            myScroll1.refresh();	
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
	                        ///myScroll.refresh();
	                    }
	                });
	            }
            }
        ///}
       // myScroll.refresh();	
       // myScroll1.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 100);	// <-- Simulate network congestion, remove setTimeout from production!
}
var myScroll1,
    pullDownEl1, pullDownOffset1,
    pullUpEl1, pullUpOffset1,
    generatedCount1 = 0;
function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                //pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
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
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                //pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
/* }
 function loaded1() {*/
    /*  222222222 */
    pullUpEl1 = document.getElementById('pullUp1');
    pullUpOffset = pullUpEl1.offsetHeight;

    myScroll1 = new iScroll('wrapper1', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullUpEl1.className.match('loading')) {
                pullUpEl1.className = '';
                //pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl1.className.match('flip')) {
                pullUpEl1.className = 'flip';
                //pullUpEl1.querySelector('.pullUpLabel').innerHTML = '下拉刷新NO333333...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl1.className.match('flip')) {
                pullUpEl1.className = '';
                //pullUpEl1.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl1.className.match('flip')) {
                pullUpEl1.className = 'loading';
                //pullUpEl1.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });
    setTimeout(function () { document.getElementById('wrapper1').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

//我的账户/积分
    $.ajax({
        url:URL+"brAccount/findAccountBalance.action",
        type:"get",
        dataType:"jsonp",
        success:function(data){
            if(typeof data == 'string'){
                var data = JSON.parse(data);
            }
            if(data.code==739){
                //console.log(data.data.balance);
                $(".money_zhulibi").html(data.data.balance);
                if($(".money_zhulibi").html().length<3){
                    $(".money_zhulibi").css({"font-size":"72px","line-height":"72px"});
                }else if($(".money_zhulibi").html().length==3 || $(".money_zhulibi").html().length==4){
                    $(".money_zhulibi").css({"font-size":"60px","line-height":"60px"});
                }else if($(".money_zhulibi").html().length==5){
                    $(".money_zhulibi").css({"font-size":"48px","line-height":"48px"});
                }else if($(".money_zhulibi").html().length>5){
                    $(".money_zhulibi").css({"font-size":"32px","line-height":"32px"});
                    $(".money_zhulibi").html("十万以上");
                }
                $(".money_jifen").html(data.data.integral);
                if($(".money_jifen").html().length<3){
                    $(".money_jifen").css({"font-size":"72px","line-height":"72px"});
                }else if($(".money_jifen").html().length==3 || $(".money_jifen").html().length==4){
                    $(".money_jifen").css({"font-size":"60px","line-height":"60px"});
                }else if($(".money_jifen").html().length==5){
                    $(".money_jifen").css({"font-size":"48px","line-height":"48px"});
                }else if($(".money_jifen").html().length>5){
                    $(".money_jifen").css({"font-size":"32px","line-height":"32px"});
                    $(".money_jifen").html("十万以上");
                }
            }else if(data.code==740){
                console.log("查询账户余额及积分余额失败")
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
        }
    });
    
    
});