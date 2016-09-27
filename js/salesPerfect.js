	//登陆验证和提交
	//var URL="https://brokeraid.100credit.com/",     //测试
    /*var URL="http://192.168.162.108:8080/minions/",*/    //108
    var URL = "https://brotest.100credit.com/",
	$('.login').click(function(){
		
		var storage = window.localStorage; 
		
		if(storage.getItem('sid')!=null){
			var sid=storage.getItem('sid');
		}else{
			var sid="";
		}
		
			
		var reg= /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		var uname=$('.uname').val();
		var upwd=$('.upwd').val();
		
		var errorStr="";
		
		
		if(uname=="" || upwd==""){
			errorStr="账号密码不能为空！";
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			
			return;
		}else if(!reg.test(uname)){
			errorStr="手机号码输入格式有误！";
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			
			return;
		}else{
			//通过验证，提交登录
			var params={
				br_mobile:uname,
				br_password:upwd,
				sid:sid
			}
			
			$.ajax({
					url:URL + "user/login.do",
                    type : 'get',
					data : params,
                    dataType : 'jsonp',
                    scriptCharset : 'urf-8',
                   /*  jsonpCallback : 'fn', */
                    success : function(data){
					
					if(typeof data == 'string'){
						
						var data = JSON.parse(data);
					}
					
					
                    if (data.code== 701){
						
						var sid=data.sid;						
						storage.setItem("sid",sid);
									
						if(storage.getItem("uid")!=null){
							
							window.location.href="main.html";
							
							storage.setItem("uid",uname);
							storage.setItem("upwd",upwd);
							storage.setItem("flag",1);
							
						}else{
							window.location.href="guodu.html";
							
							storage.setItem("uid",uname);
							storage.setItem("upwd",upwd);
							storage.setItem("flag",1);
						}
						
						/* if(document.cookie!="" && document.cookie.indexOf("uid")!=-1){	
							window.location.href="main.html";
							
							var exp = new Date();
							exp.setTime(exp.getTime() + 1*60*60*1000);
							document.cookie ="uid="+uname+";expires=" + exp.toGMTString();	
						}else{
							window.location.href="guodu.html";
							
							var exp = new Date();
							exp.setTime(exp.getTime() + 1*60*60*1000);
							document.cookie ="uid="+uname+";expires=" + exp.toGMTString();
						} */
                       
					   
					   
					      
                    }else if (data.code == 718){
                    	 
  					  errorStr="已在其他设备登录过，如非本人操作，请修改密码";
  					  $('.errorInfo').html(errorStr);
  					  $('.hiddenDiv').css('display','block');
  					  $('.bg').css('display','block');
  					  
					  localStorage.removeItem("uid");
					  localStorage.removeItem("upwd");
					  localStorage.removeItem("flag");
					  localStorage.removeItem("sid");
  					  
                     }else if (data.code == 721){
                      //登陆失败，用户名或者密码错误。
					  errorStr="账号或密码输入错误";
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
                    }else if (data.code == 722){
					  errorStr="系统维护中，联系ins@100credit.com";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }else if (data.code == 715){
					  window.location.href="login.html"
                    }else {
						console.log("ajax Error!")
                    }
                },
				error:function(){
					console.log("Error!")
				}
			})
		}
		
	})

		
 	
	//错误信息隐藏
	$('.errorBtn').click(function(){
			$('.hiddenDiv').css('display','none');
			$('.hiddenDivR').css('display','none');
			$('.bg').css('display','none');
			
			
			if($('.errorInfo').html().indexOf('注册成功')!=-1){
				window.location.href="login.html"
			}
			
			if($('.errorInfo').html().indexOf('密码修改成功')!=-1){
				window.location.href="login.html"
			}
			
	})
	
	//$('.errorImg').click(function(){
    //
	//		if($('.errorImg img')[0].src.indexOf("wrong2")==-1){
	//			$('.hiddenDiv').css('display','none');
	//			$('.hiddenDivR').css('display','none');
	//			$('.bg').css('display','none');
	//		}
    //
    //
    //
	//})
	
	
	//是否同意条款
	$(".agreed").click(function(){
		if(!$(".agreed").is(':checked')){
			$(".register").css('background-color','#afafaf');
			$(".register").attr("disabled", true); 	
			$(".getBackPwd").css('background-color','#afafaf');
			$(".getBackPwd").attr("disabled", true); 	
			
		}else{
			$(".register").css('background-color','#f04e30');
			$(".register").removeAttr("disabled");
			$(".getBackPwd").css('background-color','#f04e30');
			$(".getBackPwd").removeAttr("disabled");
		}
	})
	
		
	//注册验证和提交
	$('.register').click(function(){
		var reg= /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		
		var uname=$('.r_uphone').val();
		var upwd=$('.rpwd').val();
		var yzm=$('.ryzm').val();
		var errorStr="";
		
		if(uname==""){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请填写手机号码"
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(yzm==""){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请填写验证码"
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(upwd==""){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请填写密码"
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(!reg.test(uname)){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="手机号码格式有误";
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(yzm.length!=6){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="验证码长度有误";
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(yzm!="" && $('.yanzheng input').val()=="获取验证码"){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请获取新的验证码";
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
			
		}else{
			var params={
				br_captcha:yzm,
				br_mobile:uname,
				br_password:upwd
			}
			
			$.ajax({
                url: URL + "user/register.do",
                type: "get",
                data: params,
                async: true,
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
                    if (data.code==700) {
						$('.errorImg').html("<img src='images/right.png'>");
						$('.errorInfo').html('&nbsp;'+uname+'&nbsp;注册成功');
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');	
						
                    } else if (data.code==726) {
						$('.errorImg').html("<img src='images/wrong.png'>");
						$('.errorInfo').html('验证码不匹配');
						
						$('.rpwd').val("");
						$('.ryzm').val("");
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');
						
                    }else if (data.code == 722){
					  errorStr="系统维护中，联系ins@100credit.com";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }
					else if (data.code==730) {
						$('.errorImg').html("<img src='images/wrong.png'>");
						$('.errorInfo').html('手机号已经注册过');
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');
                    }else if(data.code==712){
						$('.errorImg').html("<img src='images/wrong.png'>");
						$('.errorInfo').html('注册人数已满');
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');
					}else if (data.code == 715){
					  window.location.href="login.html"
                    }else {
                       console.log("Jquery Ajax Error!") 
                    }
                }
			});
			
		}
		
		
		
		
	})
	
	
	//发送验证码
	$('.yzm').click(function(){
		var uname = $('.r_uphone').val();
		
		var flag_wenzi=$('.wenzi span').html();
		var br_flag=1;
		if(flag_wenzi=="注册"){
			 br_flag=1;
		}else{
			 br_flag=2;
		}
		
		var params={
			br_mobile:uname,
			br_flag:br_flag
		};
		
        $.ajax({
                url: URL + "user/sendMsg.do",
				/* url: "user/sendMsg.do", */
                type: "POST",
                data: params,
                async: true,
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
					
                    if (data.code==704) {
						$('.errorImg').html("<img src='images/right.png'>");
						$('.errorInfo').html('验证码发送成功，请查收');
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');
                    } else if (data.code==724) {
						$('.errorInfo').html('验证码发送失败，请重试');
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');
                    }else if (data.code == 722){
					  errorStr="系统维护中，联系ins@100credit.com";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }
					else if (data.code==730) {
						$('.errorImg').html("<img src='images/wrong.png'>");
						$('.errorInfo').html('手机号已经注册过');
						$('.hiddenDivR').css('display','block');						
						$('.bg').css('display','block');
						$('.yzm').val('重新发送');
						$(".yzm").attr("data-in", 1); 						
                    }else if (data.code==731) {
						$('.errorInfo').html('手机号未注册');
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');
						$('.yzm').val('重新发送');
						$(".yzm").attr("data-in", 1); 
						
                    }else if (data.code==715) {
						window.location.href="login.html";
                    }else {
                       console.log("Jquery Ajax Error!") 
                    }
                }
        });
		
	})
	
	
	
	//修改密码
	$('.getBackPwd').click(function(){
		/* var reg= /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; */
		var reg= /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		var uname=$('.r_uphone').val();
		var upwd=$('.rpwd').val();
		var yzm=$('.ryzm').val();
		var errorStr="";
		
		if(uname==""){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请填写手机号码"
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(yzm==""){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请填写验证码"
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(upwd==""){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请填写密码"
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(!reg.test(uname)){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="手机号码格式有误";
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(yzm.length!=6){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="验证码长度有误";
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			return;
		}else if(yzm!="" && $('.yanzheng input').val()=="获取验证码"){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请获取新的验证码";
			$('.errorInfo').html(errorStr);
			$('.hiddenDivR').css('display','block');
			$('.bg').css('display','block');
			
			$('.rpwd').val("");
			$('.ryzm').val("");
			return;
			
		}else{
			var params={
				br_captcha:yzm,
				br_mobile:uname,
				br_password:upwd
			}
			
			$.ajax({
                url: URL + "user/forget.do",
                type: "POST",
                data: params,
                async: true,
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
                    if (data.code==702) {
						$('.errorImg').html("<img src='images/right.png'>");
						$('.errorInfo').html('密码修改成功');
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');
						$('.r_uphone').val("");
						$('.rpwd').val("");
						$('.ryzm').val("");
                    }else if (data.code == 722){
					  errorStr="系统维护中，联系ins@100credit.com";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }
					else if (data.code==726) {
						$('.errorImg').html("<img src='images/wrong.png'>");
						$('.errorInfo').html('验证码信息不匹配');
						$('.rpwd').val("");
					    $('.ryzm').val("");
						$('.hiddenDivR').css('display','block');
						$('.bg').css('display','block');
                    }else if (data.code==715) {
						window.location.href="login.html";
                    } else {
                       console.log("Jquery Ajax Error!") 
                    }
                }
			});
			
		}
		
		
		
		
	})

	
	//匹配验证提交
	$('.pipei').click(function(){
		var reg= /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //验证手机号
		var  reg_id=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//验证身份证号
		var reg_mail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;//验证邮箱地址
		var reg_name=/^[\u2E80-\u9FFF]+$/;
		var uname=$('.p_uname').val();
		var uphone=$('.p_uphone').val();
		var id=$('.p_uid').val();
		var mail=$('.p_umail').val();
		var errorStr="";
		
		if(uname==""){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请输入姓名"
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			$('.errorBtn').css('display','block');
			return;
		}else if(uphone==""){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="请输入手机号"
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			$('.errorBtn').css('display','block');
			return;
		}else if(!reg_name.test(uname) || uname.length>5){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="客户名称输入有误";
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			$('.errorBtn').css('display','block');
			return;
		}else if(!reg.test(uphone)){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="手机号码格式有误";
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			$('.errorBtn').css('display','block');
			return;
		}else if(id!="" && !reg_id.test(id)){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="身份证输入有误";
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			$('.errorBtn').css('display','block');
			return;
		}else if(mail!="" && !reg_mail.test(mail)){
			$('.errorImg').html("<img src='images/wrong.png'>");
			errorStr="邮箱地址错误";
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			$('.errorBtn').css('display','block');
			return;
		}else{
			
			$('.errorImg').html("<img src='images/wrong2.png'>");
			errorStr="系统正在请求中........";
			$('.errorInfo').html(errorStr);
			$('.hiddenDiv').css('display','block');
			$('.bg').css('display','block');
			$('.errorBtn').css('display','none');
			
			
			
			uname=encodeURI(uname);
			//通过验证，提交登录
			var params={
				br_email:mail,
				br_idcard:id,
				br_mobile:uphone,
				br_username:uname
			}
			
			$.ajax({
                url: URL + "menu/match.action",
                type: "get",
                data: params,
                async: true,
                success: function(data) {
					$('.hiddenDiv').css('display','none');
					$('.bg').css('display','none');
					
					
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
                    if (data.code== 705){
						
                      /* errorStr="匹配成功";
					  $('.errorImg').html("<img src='images/right.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); */
					  window.location.href="huaxiang.html?time_id="+data.time_id;
					     
                    }else if (data.code == 722){
					  errorStr="系统维护中，联系ins@100credit.com";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }					
					else if (data.code == 725){
					  errorStr="没有匹配上该用户，用户库正在丰富中";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }else if (data.code == 728){
					  errorStr="匹配不成功，请稍后再试";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }else if (data.code==714) {	
						$('.errorImg').html("<img src='images/wrong.png'>");
						errorStr="已到上限，联系ins@100credit.com";
						$('.errorInfo').html(errorStr);
						$('.hiddenDiv').css('display','block');
						$('.bg').css('display','block');	
						$('.errorBtn').css('display','block');
                    }else if (data.code == 715){
					  window.location.href="login.html"
                    } else {
						console.log("Jquery Ajax Error!") 
                    }
                },
				error:function(){
					 console.log("ajax Error!!!")
					
					  errorStr="服务器连接超时，请稍后再试";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
				}

			})
			
		}
		
		
		
		
		
		
	})
	
	//无匹配客户记录
	$('.smileBtn').click(function(){
		window.location.href="pipei.html";
	})
	
	
	//退出
	if(window.location.href.indexOf('shezhi')!=-1){
			
		$('.exitBtn').click(function(){
			var storage = window.localStorage; 
		
			if(storage.getItem('sid')!=null){
				var sid=storage.getItem('sid');
			}else{
				var sid="";
			}
			
			
			var params={
				sid:sid
			}
			
			
			
			$.ajax({
                url: URL + "user/logout.do",
                type: "get",
                data: params,
                success: function(data) {
					if(typeof data == 'string'){
						
						var data = JSON.parse(data);
					}
                    if (data.code== 706){
						
						localStorage.removeItem("uid");
						localStorage.removeItem("upwd");
						localStorage.removeItem("sid");
						storage.setItem("flag",2);
						
						window.location.href="login.html"
			
						     
                    }else if (data.code == 715){
						window.location.href="login.html"
						
                    } else {
						console.log("ajax Error!")
                    }
                },
				error:function(){
					console.log("Error!")
				}
			})
			
		
			 
		})
		
	}
	
	
	
	

	





