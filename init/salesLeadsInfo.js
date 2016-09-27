
//window.onload=function(){
Zepto(function($){
	
	//var URL="https://brokeraid.100credit.com/",     //测试
    /*var URL="http://192.168.162.108:8080/minions/",*/    //108
    var URL = "https://brotest.100credit.com/",
	var B = {};
	var isContact = true;
	var isTime = true;
	
	//orderContact 是否联系排序  1 联系在前 0未联系在前 
	//orderTime 时间排序  1降序 0 升序 
	var params={
				currentPage:'1',
				pageSize:'30',
				orderContact: 1, 
				orderTime: 1
	}
	
	var ownUrl = decodeURI(window.location.href);
	//console.log("ownUrl  urlparam ",ownUrl.split("?")[1]);
	var urlparam = urlToJson(ownUrl);
	
	B.salesLeadsDetails = function(){
		console.log("salesLeadsDetails",urlparam);
		if(urlparam){	
			console.log("salesLeadsDetails  urlparam ",urlparam);
			var l = document.getElementsByClassName('xiansuo_info')[0];
			var ll = document.getElementsByClassName('xiansuo_info')[1];
			
			l.getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML = urlparam.name  ? urlparam.name : '客户&nbsp'+urlparam.mobile.substring(0,3)+' '+'****'+' '+urlparam.mobile.substring(7,11); //name  province真实的
			l.getElementsByTagName('div')[0].getElementsByTagName('span')[1].innerHTML = urlparam.year  ? urlparam.year : ''; //年龄
			l.getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML = urlparam.province  ? urlparam.province : '';
			l.getElementsByTagName('div')[1].getElementsByTagName('span')[1].innerHTML = urlparam.city  ? urlparam.city : '';
			
			//l.getElementsByTagName('div')[0].getElementsByTagName('span')[1].getElementsByTagName('a')[0].onclick = new Function("pass_para_popup('" + JSON.stringify(data_list[i].user_clue_id) + "');");
			ll.getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML = urlparam.browse_count  ? urlparam.browse_count : '';
			ll.getElementsByTagName('div')[2].getElementsByTagName('span')[0].innerHTML = urlparam.last_browse_time  ? urlparam.last_browse_time : '';
			
			///险种
			ll.getElementsByTagName('div')[0].getElementsByTagName('ul')[0].innerHTML = "";
			//险种是字符不是对象，需要转换为对象
			var insuranceTypeArr = urlparam.insurance_type  ? urlparam.insurance_type.split(',') : [];//'{"健康险,少儿险":1,"意外险":2,"旅游险":2,"理财险":2}';
			//console.log("string  .insurance_type",insuranceTypeArr);
			/*insuranceTypeArr = JSON.parse(insuranceTypeArr);
			data_list[i].insurance_type = insuranceTypeArr;*/
			console.log("JSON.parse insurance_type",insuranceTypeArr);
			//console.log("data_list[i]",data_list[i])
			
			
			//为了解决险种过多显示不规则，目前只显示前3险种
			var index = 0;								
			for(var insuranceType in insuranceTypeArr) {
				if (index >= 3) {
		    	 	break;
		    	}
				var s1 = document.createElement('li');
				s1.innerHTML = insuranceTypeArr[insuranceType];
				//console.log("insuranceType",insuranceType);
				//console.log(insuranceTypeArr+ "：insuranceTypeArr ：",insuranceTypeArr[insuranceType]);
				//=====改
			  	ll.getElementsByTagName('div')[0].getElementsByTagName('ul')[0].appendChild(s1);
			  	index++;
			}
			//联络  1 联系 0否
			var isContact = urlparam.is_contact  ? urlparam.is_contact : '';
			if (isContact == 1) {
				l.getElementsByTagName('div')[1].getElementsByTagName('span')[2].className = "dataLiA";
				l.getElementsByTagName('div')[1].getElementsByTagName('span')[2].getElementsByTagName('a')[0].innerHTML = "已联络";
			} else if (isContact == 0){
				l.getElementsByTagName('div')[1].getElementsByTagName('span')[2].className = "dataLiB";
				l.getElementsByTagName('div')[1].getElementsByTagName('span')[2].getElementsByTagName('a')[0].innerHTML = "未联络";
			} else{
				l.getElementsByTagName('div')[1].getElementsByTagName('span')[2].getElementsByTagName('a')[0].innerHTML = "未知";
			}
		}				
	}
	
	//查询线索联系记录
	B.ajaxQuery = function(){
		var userClueId = urlparam.user_clue_id ? urlparam.user_clue_id : '';
	    if (userClueId == '') {
	    	console.log("url  传参数有问题user_clue_id不能为空：",urlparam.user_clue_id);
	    	return;
	    }
        var param={
			user_clue_id:userClueId
		}
		console.log("ajaxQuery user_clue_id ",userClueId)
		$.ajax({
	                //url: "https://brokeraid.100credit.com/menu/list.action",
	                url:URL+"/mySaleCule/contactList.action",
	                //url: "http://localhost/query.action.php",
	                type: "get",
	                data: param,
	                async: true,
	                dataType : 'jsonp',
	                success: function(data) {
						if(typeof data == 'string'){
							var data = JSON.parse(data);
						}
						console.log("data_data",data);	 
						if(data.code==1){
							var data_list=data.data.contactList;
							
							if (!data_list || data_list.length == 0) {
								var ll=document.createElement('div');//创建一个div
								//var aaa=$(".xiansuo_info").html();
								ll.innerHTML="";
								ll.className="xiansuo_info";
								//console.log("div_component_list000",$("#div_component_list")[0])
								//$('.content_sale').append(ll);
								$('#div_component_list').append(ll);
							} else{
								//console.log("div_component_list11aa",$("#div_component_list")[0])
								//document.getElementById("div_component_list").innerHTML = "";
								if(!document.getElementById("div_component_list") && document.getElementById("div_component_list").hasChildNodes()){
									document.getElementById("div_component_list").remove();
								}
								//document.getElementsByClassName('content_sale')[0].innerHTML = "";
								//$('.content_sale')[0].innerHTML = "";
								//console.log("div_component_list11",$("#div_component_list")[0])
								$("#div_component_list").empty();
								
								//console.log("div_component_list11",$("#div_component_list")[0])
								//console.log("$('.content_sale')11",document.getElementById("div_component_list"))
								
								for(var i=0;i<data_list.length;i++){
									//匹配成功
									
									//if(data_list[i].match_code=="1"){
									if(true)	
										var l=document.createElement('ul');//创建一个 ul
										var aaa=$("#div-mySalesInfo").clone().html();
										//console.log("aaa",aaa)
										l.innerHTML=aaa;
										l.className="sale_ul";
										//l.setAttribute("data-id",data_list[i].time_id);
										//$('.contentM ul').append(l);
										//l.setAttribute("data-id",data_list[i].user_clue_id);
										//$('.content_sale').append(l);
										$('#div_component_list').append(l);
										console.log("data_list[i]",data_list[i]);
										
										l.getElementsByTagName('li')[0].innerHTML = data_list[i].create_time ? data_list[i].create_time : "&nbsp;";
										
										
										//contact_type 1电话 2短信
										if (data_list[i].contact_type == 1) {
											//l.getElementsByTagName('li')[1].getElementsByTagName('span')[0].className = "dataLiA";
											l.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML = "电话";
											l.getElementsByTagName('li')[1].getElementsByTagName('span')[0].className="sale_ul_tel";
											l.getElementsByTagName('li')[3].getElementsByTagName('a')[0].onclick = new Function("pass_para_popup('" + JSON.stringify(data_list[i]) + "');");
										} else{
											//l.getElementsByTagName('li')[1].getElementsByTagName('span')[0].className = "dataLiB";
											l.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML = "短信";
											l.getElementsByTagName('li')[1].getElementsByTagName('span')[0].className="sale_ul_mess";
											console.log('JSON.stringify(data_list[i])',data_list[i])
											console.log('JSON.stringify(data_list[i].remarks)',JSON.stringify(data_list[i].message_desc))
											console.log('JSON.stringifystringify )',JSON.stringify(data_list[i]))
											l.getElementsByTagName('li')[3].getElementsByTagName('a')[0].onclick = new Function("pass_para_popup('" + JSON.stringify(data_list[i]) + "');");
										}
										l.getElementsByTagName('li')[2].innerHTML = data_list[i].talk_time ? data_list[i].talk_time : "&nbsp;";
										
									}// for i end
								
								}
								
								//匹配不成功
								//if(data_list[i].match_code=="0"){
								if(1=="0"){
									var username=data_list[i].username;//客户姓名	
									var match_time=data_list[i].match_time;//匹配时间
									
									var l=document.createElement('li');//创建一个li
									var aaa=$(".weipipeiLi").html()
									l.innerHTML=aaa;
									l.className="weipipeiLi";
									$('.contentM ul').append(l);
									
									
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='&nbsp;'+data_list[i].username;
									l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].innerHTML=data_list[i].match_time;
									
								}
								
							/*}*/
							
							
							
						}else if(data.code==716){
							//window.location.href="noResult.html";
							console.log("查询失败！716",data.message)
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
		//console.log("liu ajax");
	}
	
	
	
	function urlToJson(url){
		if(!(/\?/g.test(url))) return {};
		var obj = {};
		var str = url.split("?");
		var str01 = str[1].split("&");
		for(var i = 0;i < str01.length;i++){
			var temp = str01[i].split('=');
			obj[temp[0]] = temp[1];
		}
		return obj;
	}
	
	
	
	
	
	
	
	
	//确定--重新登录
    $(".finish_sure").click(function(){
        location.href="login.html";
    });
    //722内部错误---取消
    /*$(".cancel_contact").click(function(){
        $(".bg").css("display","none");
        $(".content_contact").css("display","none");
    });*/
    //722内部错误---取消
	$(".cancel").click(function(){
		$(".bg_content_nochecked").css("display","none");
		$(".content_contact").css("display","none");
	});
	
	$(".cancel").click(function(){
        $(".bg").css("display","none");
        $(".content_session").css("display","none");
    });
    //错误信息隐藏
	$('.errorBtn').click(function(){
		$('.hiddenDiv').css('display','none');
		$('.hiddenDivR').css('display','none');
		$('.bg').css('display','none');
		$(".bg_content_nochecked").css("display","none");
		
		if($('.errorInfo').html().indexOf('注册成功')!=-1){
			window.location.href="login.html"
		}
		
		if($('.errorInfo').html().indexOf('密码修改成功')!=-1){
			window.location.href="login.html"
		}
			
	})
	// br_email 邮箱 string  br_idcard 身份证 string    br_mobile 手机号码 string   br_username 用户名 
	///window.location.href = encodeURI("huaxiang.html?br_username="+brUsername+"&br_mobile="+urlparam.mobile+"&br_idcard=&br_email=");
	///?br_username="+brUsername+"&br_mobile="+urlparam.mobile+"&br_idcard=&br_email=";
	$('.nameLi1').click(function(){
		var brUsername = urlparam.name ? urlparam.name : '客户';
		brUsername = encodeURIComponent(brUsername);
		console.log(urlparam.mobile+"aa nameLi1 name="+brUsername,urlparam)
		$(".bg_content_nochecked").css("display","block");
		$(".loading").css("display","block");
	    if (brUsername != '') {
			//通过验证，提交登录
			var params={
				br_email:'',
				br_idcard:'',
				br_mobile:urlparam.mobile,
				br_username:brUsername,
				br_status:2
			}
			var errorStr="";
			$.ajax({
                url: urlIp+"/menu/match.action",
                type: "get",
                data: params,
				dataType : 'jsonp',
                async: true,
                success: function(data) {
					
					if(typeof data == 'string'){
						var data = JSON.parse(data);	
					}
                    if (data.code== 705){
						
                      /* errorStr="匹配成功";
					  $('.errorImg').html("<img src='images/right.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); */
					$(".bg_content_nochecked").css("display","none");
					$(".loading").css("display","none");
					console.log("ok huaxiang.html time_id=",data.time_id)
					window.location.href="huaxiang.html?time_id="+data.time_id;
					     
                    }else if(data.code==715){
                    	$(".loading").css("display","none");
		                console.log("session为空,请重新登录");
		                $(".bg").css("display","block");
		                $(".content_sessionNull").css("display","block");
		                localStorage.removeItem("uid");
		                localStorage.removeItem("upwd");
		                localStorage.removeItem("flag");
		                localStorage.removeItem("sid");
		                localStorage.removeItem("device_id");
		            }else if(data.code==718){
		            	$(".loading").css("display","none");
		                console.log("您的账号已在其他设备上登录");
		                $(".bg").css("display","block");
		                $(".content_other").css("display","block");
		                localStorage.removeItem("uid");
		                localStorage.removeItem("upwd");
		                localStorage.removeItem("flag");
		                localStorage.removeItem("sid");
		                localStorage.removeItem("device_id");
		            }else if(data.code==722){
		            	$(".loading").css("display","none");
		                console.log("内部错误");
		                $(".bg").css("display","block");
		                $(".content_contact").css("display","block");
		                
		            }else if(data.code==5){
		            	$(".loading").css("display","none");
		                console.log("助理币不足");
		                $(".bg").css("display","block");
		                $(".content_poor").css("display","block");
		            }else if (data.code == 725){
		            	$(".loading").css("display","none");
					  errorStr="没有匹配上该用户，用户库正在丰富中";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }else if (data.code == 728){
                    	$(".loading").css("display","none");
					  errorStr="匹配不成功，请稍后再试";
					  $('.errorImg').html("<img src='images/wrong.png'>");
					  $('.errorInfo').html(errorStr);
					  $('.hiddenDiv').css('display','block');
					  $('.bg').css('display','block'); 
					  $('.errorBtn').css('display','block');
                    }else if (data.code==714) {	
                    	$(".loading").css("display","none");
						$('.errorImg').html("<img src='images/wrong.png'>");
						errorStr="已到上限，联系ins@100credit.com";
						$('.errorInfo').html(errorStr);
						$('.hiddenDiv').css('display','block');
						$('.bg').css('display','block');	
						$('.errorBtn').css('display','block');
                    }
					
                },
				error:function(){
					$(".loading").css("display","none");
					console.log("match.action  ajax Error!!!")
				}

			})
			
	   }else{
	    	console.log("url  传参数有问题brUsername不能为空：",urlparam.name);
	    }
	   // return false;
	});
	
	//完善销售线索 salesLeadsPerfect.htm  用到的参数  user_id="+urlparam.user_id+"&user_clue_id="+urlparam.user_clue_id
	$('.nameLi2').click(function(){
		console.log("aa nameLi2 user_clue_id=",urlparam.user_clue_id)
	    var userClueId = urlparam.user_clue_id ? urlparam.user_clue_id : '';
	    if (userClueId != '') {
	    	var str = ownUrl.split("?")[1];
	    	///user_id="+urlparam.user_id+"&user_clue_id="+urlparam.user_clue_id
	    	window.location.href = encodeURI("salesLeadsPerfect.html?"+str);
	    }else{
	    	console.log("url  传参数有问题user_clue_id不能为空：",urlparam.user_clue_id);
	    }
	});
	/*
	 * 本次电话备注
	 * 
	 */
	$('#btn-tel').click(function(){
		$('#form-edit')[0].value = "";
		$('#form-edit')[0].innerHTML = "";
		$('#form-edit')[0].setAttribute("placeholder","请输入同客户联络的电话备注内容!");
    	console.log("btn-tel",urlparam.mobile)
    	//if (urlparam.mobile) {
    	//	BrCordova.makePhoneCall(urlparam.mobile,urlparam.user_clue_id);

    	if (urlparam.mobile) {
    		BrCordova.makePhoneCall(urlparam.mobile,urlparam.user_clue_id);
    		var params={
				user_clue_id:urlparam.user_clue_id
			}
    		$.ajax({
                //url: "https://brokeraid.100credit.com/menu/list.action",
                url: URL+"/mySaleCule/updateCall.action",
                //url: "http://localhost/query.action.php",
                type: "get",
                data: params,
                async: true,
                dataType : 'jsonp',
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
				}
            });
    	}else{
    		return false;
    	}
    	
        $('body').popup({
            title:'',//表单提交
            id:'pop-1'
            ,formId:'form-edit'
            ,closeOnOk:true
            ,ok:'本次电话备注'
            ,onOk:function(){
            	$('#form-edit')[0].setAttribute("data-action","saveCall");
            	//短信、打电话   修改电话备注
                $('#form-edit').submit();
            }
            ,cnacel:"取消"
            ,onCancel : function() {
            	//alert('我是取消按钮');
        	}
        });
        return false;
    });
	/*	 
	 * 立即短信下发
	 */
	
	$('.mainBtnGray').click(function(){
	//$('#btn-tel-message').click(function(){
		console.log("短信下发 user_clue_id=",urlparam.user_clue_id)
		$('#form-edit')[0].value = "";
		$('#form-edit')[0].innerHTML = "";
		$('#form-edit')[0].setAttribute("placeholder","请输入同客户联络的短信内容!");
        $('body').popup({
            title:'',//表单提交
            id:'pop-1'
            ,formId:'form-edit'
            ,closeOnOk:true
            ,ok:'发送'
            ,onOk:function(){
            	$('#form-edit')[0].setAttribute("data-action","sendMessage");
            	//短信、打电话   修改电话备注
            	console.log("短信下发 user_clue_id111 click =")
                $('#form-edit').submit();
            }
            ,cnacel:"取消"
            ,onCancel : function() {
            	//alert('我是取消按钮');
        	}
        });
        //return false;
	    
	    
            
	});
	/*
	 * 立即短信下发
	 */
	$('#form-edit').bind('submit',function(){
        var userClueId = urlparam.user_clue_id ? urlparam.user_clue_id : '';
	    if (userClueId == '') {
	    	console.log("url  传参数有问题user_clue_id不能为空：",urlparam.user_clue_id);
	    	return false;
	    }
	    
        var param={
			user_clue_id:userClueId
		}
        
        var dataAction = $('#form-edit')[0].getAttribute('data-action');
        console.log("ajaxurlCall------------------",dataAction)
        //短信、打电话   修改电话备注
		var ajaxurl = urlIp+"/mySaleCule/sendMessage.action";//短信
        var messageHandle = "打电话";
        if (dataAction == 'saveCall') {
        	messageHandle = "打电话";
        	ajaxurl = urlIp+"/mySaleCule/saveCall.action";
        	if (param.message) {
        		delete param.message;
        	}
        	param.remarks = $('#form-edit')[0].value;
        	param.remarks = encodeURIComponent(param.remarks);
        	//encodeURI
        	//param.talk_time = ;
        }else if(dataAction == "sendMessage"){
        	messageHandle = "短信";
        	ajaxurl = urlIp+"/mySaleCule/sendMessage.action";
        	if (param.remarks) {
        		delete param.remarks;
        	}
        	param.message = $('#form-edit')[0].value;
        	param.message = encodeURIComponent(param.message);
        }else{
        	messageHandle = "修改电话备注";
        	ajaxurl = urlIp+"/mySaleCule/updateText.action";
        	if (param.message) {
        		delete param.message;
        	}
        	param.id =  $('#form-edit')[0].getAttribute('data-id');
        	param.remark = $('#form-edit')[0].value;
        	param.remark = encodeURIComponent(param.remark);
        }
        //console.log('param!!!' , param);
        console.log(param.user_clue_id+"liu ok user_clue_id')"+param.message,ajaxurl);
        
        console.log(messageHandle+'发 submit  edit',$('#form-edit')[0].innerHTML);
		console.log(messageHandle+'发 submit  param',param);
		
		//console.log("encodeURI')",encodeURI(param.insure_name));
		//console.log("encodeURIComponent')",encodeURIComponent(param.insure_name));
		//console.log("escape')",escape(param.insure_name));
		//param.message = encodeURIComponent(param.message);
		//param.insure_name = encodeURI(param.insure_name);
		//param.insure_name = escape(param.insure_name);
		
		//短信、打电话  、  修改电话备注当前哪个弹出框弹出就是哪个操作的地址，共用一个输入内容框
       	$.ajax({
                //url: "https://brokeraid.100credit.com/menu/list.action",
                url: ajaxurl,
                //url: "http://localhost/query.action.php",
                type: "get",
                data: param,
                async: true,
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
					
					if(data.code==1){
						B.ajaxQuery();
						console.log(messageHandle+"成功！1 ",data.message);
					}else if(data.code==2){
						//window.location.href="noResult.html";
						console.log(messageHandle+"失败！2 ",data.message)
					}else if(data.code==3){
						//B.ajaxQuery();
						console.log(messageHandle+"！3 ",data.message)
					}else if(data.code==732){
						//window.location.href="noResult.html";
						console.log("新增失败！732 ",data.message)
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
        console.log("短信、打电话   修改电话备注  成功！1","  ");
        return false;
    });
	/*
	 *单条删除确认框
	 * 
	 */
	$('#form-1').bind('submit',function(){
        //alert('表单form-1提交oo');
        var user_clue_id =  $('#form-1')[0].getAttribute('data-id');
        console.log("liu ok $('#form-1')",user_clue_id);
        var params={
				user_clue_id:user_clue_id
		}
       	$.ajax({
                //url: "https://brokeraid.100credit.com/menu/list.action",
                url: URL+"/mySaleCule/delete.action",
                //url: "http://localhost/query.action.php",
                type: "get",
                data: params,
                async: true,
                dataType : 'jsonp',
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
					
					if(data.code==1){
						B.ajaxQuery();
						console.log("删除成功！1",data.message);
					}else if(data.code==2){
						//window.location.href="noResult.html";
						console.log("删除失败！2",data.message);
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
        console.log("删除成功！1"," return false");
        return false;
    });
	
	//初始化线索信息一次
	B.salesLeadsDetails();
	
	////初始化查询一次
	B.ajaxQuery();
	console.log("liu ok");
	

})

/*
 * 跳转页面salesLeadsInfo.html并传参
 * 
 *   province  省份名称
	 city	城市名称
	 area	区县名称
	 browse_count 浏览次数   
	 insurance_type 险种  格式 {"健康险":3,"少儿险":1,"意外险":2,"旅游险":2,"理财险":2} 
	 is_contact 是否联系  1 联系 0否 
	 last_browse_time 最后浏览时间   
	 mobile 电话   
	 user_clue_id id
 */
function pass_para_popup_link(passed){
	passed = JSON.parse(passed);
	//console.log('pass_para_popup_link()!!!' , passed );
    var insuranceTypeArr=[];
    for (var item in passed.insurance_type) {
    	 insuranceTypeArr.push(item);
    }
    var insuranceType=insuranceTypeArr.join();
    var uri ="salesLeadsInfo.html?name="+passed.name+"&area="+passed.area+"&city="+passed.city+"&insurance_type="+insuranceType+"&is_contact="+passed.is_contact+"&browse_count="+passed.browse_count+"&last_browse_time="+passed.last_browse_time+"&province="+passed.province;
	console.log('pass_para_popup_link()!!! +!!!', uri );
	uri = encodeURI(uri)
	//console.log('uri!!!', uri );
	window.location.href = uri;//sale.js
}

function pass_para_popup(passed){
	console.log('pass_para_popup()!!!ss' , passed );
	passed = JSON.parse(passed);
	console.log('pass_para_popup()!!!' , passed );
	/* var id =  $('#form-edit')[0].getAttribute('data-id');
	$('#form-edit')[0].setAttribute("data-id",passed);*/
	$('#form-edit')[0].value = passed.message_desc;
	////contact_type 1电话 2短信    短信内容不可编译disabled="disabled"  
	if (passed.contact_type == 2) {
		//document.getElementById("form-edit").setAttribute('disabled','disabled');
		//$('#form-edit')[0].setAttribute('disabled','disabled');
	}
	console.log('pass_para_popup()!!!' , $('#form-edit')[0] );
	$('body').popup({
        title:'',//表单提交
        id:'pop-1'
        ,formId:'form-edit'
        ,closeOnOk:true
        ,ok:'确认'
        ,onOk:function(){
        	//console.log('$(#form-1)!!!' , $('#form-1') );
        	//console.log('pass_para_popup()!!!' , $('#form-1')[0] );
        	
        	//contact_type 1电话 2短信
        	if (passed.contact_type == 1) {
        		//短信、打电话   修改电话备注
        		$('#form-edit')[0].setAttribute("data-id",passed.id);
        		$('#form-edit')[0].setAttribute("data-action","updateText");
				//console.log(passed.id+"修改电话备注 user_clue_id111 click =",passed.id)
        		$('#form-edit').submit();
        	}else{
        		console.log('pass_para_popup() o')
        		 //disabled="disabled"  
        		$('#form-edit')[0].removeAttribute('disabled');
        	}
            console.log('pass_para_popup() onOk!!!' , $('#form-edit')[0] );
            //alert('我是确认按钮'+passed);
        }
        ,cnacel:"取消"
        ,onCancel : function() {
        	//alert('我是取消按钮');
        	//contact_type 1电话 2短信
        	if (passed.contact_type == 2) {
        		 //disabled="disabled"  
        		$('#form-edit')[0].removeAttribute('disabled');
        	}
    	}
    });
     
}
