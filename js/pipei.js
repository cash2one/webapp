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
};


/*var URL = "https://brokeraid.100credit.com/";*/   //测试
//var URL="http://192.168.162.192:8080/minions/";    //108
var URL = "https://brotest.100credit.com/";
//用户账户余额和抢单所需助理币
$.ajax({
	url: URL + "menu/userCurrency.action",
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
				$(".pipei").css("display", "block");
			}else if (data_list.type == 0) {
				$(".chongmoney").css("display", "block");
				$(".pipei").css("display", "none");
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

//$("input").keyup(function(){
//	$(this).parent("div").next(".space_div").css("border-bottom","1px solid #f04e30");
//});

$("input").focus(function(){
	$(this).parent("div").next(".space_div").css("border-bottom","1px solid #f04e30");
});
$("input").blur(function(){
	$(this).parent("div").next(".space_div").css("border-bottom","1px solid #dbdcde");
});

window.onload=function(){
	

	/* getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].onmousemove=function(){
		if(getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML=='<img src="images/d.png">'){
			getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML='<img src="images/d_mouse.png">'	
		}
		if(getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML=='<img src="images/u.png">'){
			getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML='<img src="images/u_mouse.png">'	
		}
			
	} */
	/* getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].onmouseout=function(){
		if(getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML=='<img src="images/d_mouse.png">'){
			getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML='<img src="images/d.png">'	
		}
		if(getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML=='<img src="images/u_mouse.png">'){
			getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML='<img src="images/u.png">'	
		}
			
	} */
	
	getByClass("p_ipt3up")[0].getElementsByTagName('span')[0].onclick=function(){
		
		
		if(getByClass("p_ipt")[0].style.display=="none"){
			getByClass("p_ipt")[0].style.display="block";
			getByClass("p_ipt")[1].style.display="block";
			//getByClass("space_div")[1].style.display="block";
			getByClass("space_div")[2].style.display="block";
			getByClass("space_div")[3].style.display="block";
			getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML='<img src="images/u.png">'	
		}else{
			getByClass("p_ipt")[0].style.display="none";
			getByClass("p_ipt")[1].style.display="none";
			//getByClass("space_div")[1].style.display="none";
			getByClass("space_div")[2].style.display="none";
			getByClass("space_div")[3].style.display="none";
			getByClass("p_ipt3up")[0].getElementsByTagName('a')[0].innerHTML='<img src="images/d.png">'	
		}
		
	}
}

