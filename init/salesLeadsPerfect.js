function IdentityCodeValid(code) { 
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    
   else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    ///if(!pass) alert(tip);
    ///return pass;
    if(pass){
    	return "";
	}else{
		return tip;
	};
}


Zepto(function($){
	
	//var URL="https://brokeraid.100credit.com/",     //测试
    /*var URL="http://192.168.162.108:8080/minions/",*/    //108
    var URL = "https://brotest.100credit.com/",
	/*$('.mainBtn').click(function(){
			window.location.href="pipei.html"
	})*/
	var B = {};
	var isContact = true;
	var isTime = true;
	var isShowEdit = false;
	
	//rows 每页显示行数  
	//page 当前页数
	//user_clue_id 销售线索详情id 必传
	
	var ownUrl = decodeURI(window.location.href);
	var urlparam = urlToJson(ownUrl);
	// user_clue_id: 236
	var params={ 
				page: 1,
				rows: 8,
				totalPageNum: 1,
				user_clue_id: urlparam.user_clue_id
	}
	
	//当前页中所有记录的数据id，存放到一个数组中，为了解决当前页排序问题。
	var  currentPageDataIdArr = [];
	var isReplace = false;
	
	B.ajaxQuery = function(params){
				console.log("ajaxQuery params ",params)
				$.ajax({
			                //url: "https://brokeraid.100credit.com/menu/list.action",
			                //url: "",
			                url: URL+"/mySaleCule/perfectSelect.action",
			                //url: "http://localhost/query.action.php",
			                type: "get",
			                data: params,
			                async: true,
			                dataType : 'jsonp',
			                success: function(data) {
								if(typeof data == 'string'){
									var data = JSON.parse(data);
									
								}
								if(data.code==737){
									var data_list=data.data.rows;
									params.totalPageNum=data.data.totalPageNum;
									
									var divComponentListArr = document.getElementById('div_component_list').children;
									
									if (!data_list || data_list.length == 0) {
										/// 目前这块代码执行不到，因为后台返回的数据没有为零的情况，找不到直接 738 code码了
										if(document.getElementById("div_component_list") || document.getElementById("div_component_list").hasChildNodes()){
											for (var x=1;x<divComponentListArr.length;x++)
											{ 
												divComponentListArr[x].style.display = 'none';
											} 
										}
										var ll=document.getElementById('divResultIsEmpty');//获得一个div
										ll.style.display = "block";
										ll.innerHTML="";//"请返回销售线索获取您的第一位客户!";
										
									} else{
										//console.log("div_component_list11aa",$("#div_component_list")[0])
										//document.getElementById("div_component_list").innerHTML = "";
										if(document.getElementById("div_component_list") && document.getElementById("div_component_list").hasChildNodes()){
											///document.getElementById("div_component_list").remove();
											console.log("hasChildNodes= ",document.getElementById("div_component_list").hasChildNodes())
											document.getElementById('divResultIsEmpty').style.display = "none";
											document.getElementById('pullUp').style.display="block";
											for (var x=1;x<divComponentListArr.length;x++)
											{ 
												divComponentListArr[x].style.display = 'block';
											} 
										}
										
										//if (data_list.length < 8 ) {
											document.getElementById('pullUp').style.display="none";
										/*} else{
											document.getElementById('pullUp').style.display="block";
										}*/
										
										var el = document.getElementById('div_component_list');
										//document.getElementsByClassName('content_sale')[0].innerHTML = "";
										//$('.content_sale')[0].innerHTML = "";
										//console.log("div_component_list11",$("#div_component_list")[0])
										///$("#div_component_list").empty();
										
										//console.log("div_component_list11",$("#div_component_list")[0])
										//console.log("$('.content_sale')11",document.getElementById("div_component_list"))
										if (isReplace) {
											/*
											 * currentPageDataIdArr 按照当前页面删除
											 * 
											 * for (var dataId in currentPageDataIdArr) {
												console.log(dataId+"dataId",currentPageDataIdArr[dataId]);
									    	 	for(var y=0;y<el.children.length;y++){
													///var user_clue_id =  $('#div_component_list')[0].children[y].getAttribute('data-id');
											 		var divChildren = el.children[y];
											 		console.log("el.children",divChildren);
										    		if (divChildren.getAttribute('data-id') == currentPageDataIdArr[dataId]) {
										    			el.removeChild(divChildren);
										    		}
										    	}
									    	}*/
											/* 全部删除 ，只留原来一个 */
											for(var y=el.children.length-1 ;y >= 1;y--){
												var divChildren = el.children[y];
									    		el.removeChild(divChildren);
									    	}
										}
										
										
										currentPageDataIdArr = [];//跟新最新的数据ID
										for(var i=0;i<data_list.length;i++){
											//匹配成功
											
											//if(data_list[i].match_code=="1"){
											if(true)	
												var l=document.createElement('div');//创建一个div
												//var aaa=$(".xiansuo_info").html();
												//var aaa=$("#div-mySalesInfo").html();
												var aaa=$("#div-mySalesInfo").clone().html();
												//console.log("aaa",aaa)
												l.innerHTML=aaa;
												l.className="xiansuo_info";
												//l.setAttribute("data-id",data_list[i].time_id);
												//$('.contentM ul').append(l);
												currentPageDataIdArr.push(data_list[i].id);
												l.setAttribute("data-id",data_list[i].id);
												
												///$('.content_sale').append(l);
												el.appendChild(l, el.childNodes[0]);
												
												//console.log("lll",l)
												/*if(data_list[i].sex=="1"){
													l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='<img src="images/m1.jpg">&nbsp;'+data_list[i].username;
												}else if(data_list[i].sex=="2"){
													l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='<img src="images/m2.jpg">&nbsp;'+data_list[i].username;
												}else{
													l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='&nbsp;'+data_list[i].username;
													l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML='<img src="images/id2.jpg">';
												}*/
												
												l.getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML = data_list[i].insure_name; //name  真实的 
												l.getElementsByTagName('div')[0].getElementsByTagName('span')[1].innerHTML = data_list[i].id_card; 
												
												//投保日期：
												var insuranceDateArr = data_list[i].insurance_time ? data_list[i].insurance_time.split('-') : "";
												var insuranceDateFormat = insuranceDateArr ? insuranceDateArr[0]+"年"+insuranceDateArr[1]+"月"+insuranceDateArr[2]+"日" : "";
												
												l.getElementsByTagName('div')[1].getElementsByTagName('span')[1].innerHTML = insuranceDateFormat;
												
												//修改和删除按钮
												//JSON.stringify(resp, null, "    "); //ok 4个空格passed = passed.replaceChild('\"','"')
												//var reg=new RegExp('\"',"g"); //创建正则RegExp对象  
												var stringObj=JSON.stringify(data_list[i]);  
												//var newstr=stringObj.replace(reg,'"');
												
												//console.log("data_list",data_list)
												//console.log("data_list[i]  ",stringObj )
												
												l.getElementsByTagName('div')[1].getElementsByTagName('span')[2].getElementsByTagName('a')[0].onclick = new Function("pass_para_popup_edit('" + stringObj + "');");//data_list[i].i
												l.getElementsByTagName('div')[1].getElementsByTagName('span')[2].getElementsByTagName('a')[1].onclick = new Function("pass_para_popup('" + data_list[i].id + "');");
												l.getElementsByTagName('div')[1].getElementsByTagName('span')[2].style.display = isShowEdit ? "block" : "none";
						
												//l.getElementsByTagName('p')[5].getElementsByTagName('span')[1].innerHTML=data_list[i].match_time;
												//投保险种：
												l.getElementsByTagName('div')[2].getElementsByTagName('span')[1].innerHTML = data_list[i].insurance_type;
												//投保期限：
												var begintimeArr = data_list[i].insure_begintime ? data_list[i].insure_begintime.split('-') : "";
												var begintimeFormat = begintimeArr ? begintimeArr[0]+"年"+begintimeArr[1]+"月"+begintimeArr[2]+"日" : "";
												
												var endtimeArr = data_list[i].insure_endtime ? data_list[i].insure_endtime.split('-') : "";
												var endtimeFormat = endtimeArr ? endtimeArr[0]+"年"+endtimeArr[1]+"月"+endtimeArr[2]+"日" : "";
												var isSymbol = (begintimeFormat == '' && endtimeFormat == '') ? '' : "~";
												l.getElementsByTagName('div')[3].getElementsByTagName('span')[1].innerHTML = begintimeFormat + isSymbol + endtimeFormat;
												
													
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
									
									myScroll.refresh();	
									
								}else if(data.code==738){
									/* 全部删除 ，只留原来一个 */
									var el = document.getElementById('div_component_list');
									for(var y=el.children.length-1 ;y >= 1;y--){
										var divChildren = el.children[y];
							    		el.removeChild(divChildren);
							    	}
									document.getElementById('pullUp').style.display="none";
									console.log("查询完善销售线索为空！738",data.message);
								}else if (data.code == 715){
									//window.location.href="login.html"
									console.log("查询失败！715",data.message)
			                    }else{
									console.log("查询失败！",data.message)
								}
									
							myScroll.refresh();		
			                }
				});
				console.log("liu ajax");
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
    $(".cancel_contact").click(function(){
        $(".bg").css("display","none");
        $(".content_contact").css("display","none");
    });
	
	///编译控制显示隐藏 bar
	$('#btnbar-edit').click(function(){
		//console.log("isShowEdit=",isShowEdit)
		isShowEdit = !isShowEdit;
		var nameArr=document.getElementsByClassName('right_toolbar');
	    for(var i=0;i<nameArr.length;i++){
	    	nameArr[i].style.display = isShowEdit ? "block" : "none";
	   	}
	});
	
	//返回上一页，并传上页所需的参数 console.log("owenUrl params ",owenUrl)
	$('.back').click(function(){
		console.log("aa back user_clue_id=",urlparam.user_clue_id)
	    var userClueId = urlparam.user_clue_id ? urlparam.user_clue_id : '';
	    if (userClueId != '') {
	    	var str = ownUrl.split("?")[1];
	    	window.location.href = encodeURI("salesLeadsInfo.html?"+str);
	    }else{
	    	console.log("url  传参数有问题user_clue_id不能为空：",urlparam.user_clue_id);
	    }
	});
	
	
	/*$('#form-add')[0].getElementsByTagName('input')[2].click(function(){
		console.log("isContact="+params.orderContact,isContact)
		isContact = !isContact;
	    params.orderContact = isContact ? 1 : 0;
	    B.ajaxQuery(params);
	   // return false;
	});*/
	
	$('#btn-add').click(function(){
		//$('#form-add')[0].getElementsByTagName('input').value ="";
		$('#form-add')[0].getElementsByTagName('input')[0].value = "";
		$('#form-add')[0].getElementsByTagName('input')[1].value = "";
		$('#form-add')[0].getElementsByTagName('input')[2].value = "";
		$('#form-add')[0].getElementsByTagName('input')[3].value = "";
		$('#form-add')[0].getElementsByTagName('input')[4].value = "";
		$('#form-add')[0].getElementsByTagName('input')[5].value = "";
		$('#form-add')[0].setAttribute("data-id","");
		$('#form-add')[0].getElementsByTagName('span')[0].innerHTML = "";
		$('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "";
		$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "";
		$('#form-add')[0].getElementsByTagName('span')[3].innerHTML = "";
		$('#form-add')[0].getElementsByTagName('span')[4].innerHTML = "";
		$('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "";
    	console.log("btn-add",$('body'))
        $('body').popup({
            title:'',//表单提交
            id:'pop-1'
            ,formId:'form-add'
            ,closeOnOk:false
            ,ok:'添加'
            ,onOk:function(){
            	console.log('input 添加 !!!  submit' ,$('#form-add')[0].getElementsByTagName('input')[0].value);
            	 //最强验证日期的正则表达式,添加了闰年的验证。   
				var regDate = /(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)/;
				var regName = /^[a-zA-Z\u4e00-\u9fa5]+$/;
				var flagVerification = 0;
            	if ($('#form-add')[0].getElementsByTagName('input')[0].value != "") {
            		//flagVerification = 1;
					var name = $('#form-add')[0].getElementsByTagName('input')[0].value;
					if(!regName.test(name)){
						flagVerification = 0;
						$('#form-add')[0].getElementsByTagName('span')[0].innerHTML = "格式不符或为空!";
					}else{
						flagVerification = 1;
						$('#form-add')[0].getElementsByTagName('span')[0].innerHTML = "";
					}

            	}else{
            		flagVerification = 0;
            		$('#form-add')[0].getElementsByTagName('span')[0].innerHTML = "格式不符或为空!";
            	}
            	console.log('input 添加 !!!  span' ,$('#form-add')[0].getElementsByTagName('span')[0]);
            	
            	var flagVerification1 = 0;
            	if ($('#form-add')[0].getElementsByTagName('input')[1].value != "") {
            		
            		var num = $('#form-add')[0].getElementsByTagName('input')[1].value;
            		num = num.toUpperCase();
            		console.log('input num submit',num );
            		///$('#form-add')[0].getElementsByTagName('input')[0].placeholder = num;
				    
				    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
				    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
					console.log('input num submit11',!reg.test(num) );
					console.log('input num submit length ',$('#form-add')[0].getElementsByTagName('input')[1].value.length);
				    
    				if(!reg.test(num)) {
    					//if (!(/(^/d{15}$)|(^/d{17}([0-9]|X)$)/.test(num))) {
				        //alert('输入的身份证号长度不对，或者号码不符合规定！/n15位号码应全为数字，18位号码末位可以为数字或X。');
				        flagVerification1 =  0;
				        $('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "格式不符或长度不对!";
    				}else{
    					flagVerification1 = 1;
    					$('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "";
    				}
    				///严格 身份证号校验
    				var strictValid = IdentityCodeValid(num);
    				if (strictValid != "") {
    					flagVerification1 =  0;
				        $('#form-add')[0].getElementsByTagName('span')[1].innerHTML = strictValid;
    				} else{
    					flagVerification1 = 1;
    					$('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "";
    				}
    				
            		
            	}else{
            		flagVerification1 = 0;
            		$('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "格式不符或为空!";
            	}
            	
            	var  flagVerification2 =  0;
            	if ($('#form-add')[0].getElementsByTagName('input')[2].value != "") {
            		var num = $('#form-add')[0].getElementsByTagName('input')[2].value;
					console.log(num+'input num submit==',!regDate.test(num) );
    				if(!regDate.test(num)) {
				        flagVerification2 =  0;
				        $('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "格式不符或长度不对!";
    				}else{
				        	//$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "日期不能大于当今天!";
						flagVerification2 = 1;
    					$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "";
    				}
            	}else{
            		flagVerification2 = 0;
            		$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "格式不符或为空!格式2015-01-01";
            	}
            	
            	///投保期限 开始
            	var flagVerification4 =  0;
            	if ($('#form-add')[0].getElementsByTagName('input')[4].value != "") {
            		var num = $('#form-add')[0].getElementsByTagName('input')[4].value;
					console.log(num+'input num submit==',!regDate.test(num) );
    				if(!regDate.test(num)) {
				        flagVerification4 =  0;
				        $('#form-add')[0].getElementsByTagName('span')[4].innerHTML = "开始格式不符!";
    				}else{
				        	//$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "日期不能大于当今天!";
						flagVerification4 = 1;
    					$('#form-add')[0].getElementsByTagName('span')[4].innerHTML = "";
    				}
            	}else{
            		flagVerification4 = 1;
            	}
            	///投保期限 结束
            	var flagVerification5 =  0;
            	if ($('#form-add')[0].getElementsByTagName('input')[5].value != "") {
            		var num = $('#form-add')[0].getElementsByTagName('input')[5].value;
					console.log(num+'input num submit==',!regDate.test(num) );
    				if(!regDate.test(num)) {
				        flagVerification5 = 0;
				        $('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "结束格式不符!";
    				}else{
						var num4 = $('#form-add')[0].getElementsByTagName('input')[4].value;
						if ($('#form-add')[0].getElementsByTagName('input')[4].value != "" && regDate.test(num4)) {
		    				if(num >= num4) {
		    					flagVerification5 = 1;
    							$('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "";
		    				} else{
								flagVerification5 = 0;
	    						$('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "开始比结束大！";
							}
		    				
						} else{
							flagVerification5 = 1;
    						$('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "";
						}
						
    				}
            	}else{
            		flagVerification5 = 1;
            	}
        
        		var flagVerifications = flagVerification + flagVerification1 + flagVerification2 + flagVerification4 + flagVerification5;
        		
                if (flagVerifications == 5 ) {
                	$('#form-add').submit();
                	$("#pop-1").trigger("close");
                }
                
            }
            ,cnacel:"取消"
            ,onCancel : function() {
            	//alert('我是取消按钮');
        	}
        });
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
        //要删除的完善销售线索id
        var paramsdel={
				id:user_clue_id
		}
       	$.ajax({
                //url: "https://brokeraid.100credit.com/menu/list.action",
                url: URL+"/mySaleCule/perfectDelete.action",
                //url: "http://localhost/query.action.php",
                type: "get",
                data: paramsdel,
                async: true,
                dataType : 'jsonp',
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
					
					if(data.code==733){
						isReplace = true;
						var pageSizeTemp = params.page * params.rows -1;
						var paramsTemp={ 
									page: 1,
									rows: pageSizeTemp,
									totalPageNum: params.totalPageNum,
									user_clue_id: urlparam.user_clue_id
						}
						console.log("删除 ！paramsTemp",paramsTemp);
						B.ajaxQuery(paramsTemp);
						console.log("删除成功！1",data.message);
					}else if(data.code==734){
						//window.location.href="noResult.html";
						console.log("删除失败！2",data.message)
					}else if (data.code == 715){
						//window.location.href="login.html"
						console.log("删除失败！715",data.message)
                    }else{
						console.log("删除失败！",data.message)
					}
					
				}
            });
        console.log("删除成功！1"," return false");
        return false;
    });
	/*
	 *单条编辑完善销售线索框
	 * 新增user_clue_id 值为空
	 */
	$('#form-add').bind('submit',function(){
        //alert('表单form-1提交oo');
        //要编辑的完善销售线索id
        var param={
				id:''
		}
        console.log('!!!form-add',$('#form-add')[0].getElementsByTagName('input')[0].value);
		param.insure_name = $('#form-add')[0].getElementsByTagName('input')[0].value;
		param.id_card = $('#form-add')[0].getElementsByTagName('input')[1].value;
		param.insurance_time = $('#form-add')[0].getElementsByTagName('input')[2].value ;
		param.insurance_type = $('#form-add')[0].getElementsByTagName('input')[3].value;
		param.insure_begintime = $('#form-add')[0].getElementsByTagName('input')[4].value;
		param.insure_endtime = $('#form-add')[0].getElementsByTagName('input')[5].value ;
		
		
		//console.log("encodeURI')",encodeURI(param.insure_name));
		//console.log("encodeURIComponent')",encodeURIComponent(param.insure_name));
		//console.log("escape')",escape(param.insure_name));
		param.insurance_type = encodeURIComponent(param.insurance_type)
		param.insure_name = encodeURI(param.insure_name);
		//param.insure_name = escape(param.insure_name);
		
		var ajaxurl = urlIp+"/mySaleCule/perfect.action";
		
        var id =  $('#form-add')[0].getAttribute('data-id');
        console.log("id "+id,$('#form-add')[0].getAttribute('data-id'))
        if (id != "") {
        	param.id = id;
        	ajaxurl = urlIp+"/mySaleCule/perfectEdit.action";
        }else{
        	param.user_clue_id = params.user_clue_id;
        }
        console.log('param!!!' , param);
        console.log(param.user_clue_id+"liu ok user_clue_id')"+param.id,ajaxurl);
        
       	$.ajax({
                //url: "https://brokeraid.100credit.com/menu/list.action",
                url: ajaxurl,
                //url: "http://localhost/query.action.php",
                type: "get",
                data: param,
                async: true,
                dataType : 'jsonp',
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
					
					if(data.code==735){
						isReplace = true;
						var pageSizeTemp = params.page * params.rows;
						var paramsTemp={ 
									page: 1,
									rows: pageSizeTemp,
									totalPageNum: params.totalPageNum,
									user_clue_id: urlparam.user_clue_id
						}
						B.ajaxQuery(paramsTemp);
						console.log("编辑成功！735 ",data.message);
					}else if(data.code==736){
						//window.location.href="noResult.html";
						console.log("编辑失败！736 ",data.message)
					}else if(data.code==745){
						isReplace = true;
						var pageSizeTemp = params.page * params.rows +1;
						var paramsTemp={ 
									page: 1,
									rows: pageSizeTemp,
									totalPageNum: params.totalPageNum,
									user_clue_id: urlparam.user_clue_id
						}
						B.ajaxQuery(paramsTemp);
						console.log("新增成功！745 ",data.message)
					}else if(data.code==732){
						//window.location.href="noResult.html";
						console.log("新增失败！732 ",data.message)
					}else if (data.code == 715){
						//window.location.href="login.html"
						console.log("编辑失败！715",data.message)
                    }else{
						console.log("编辑失败！",data.message)
					}
					
				}
            });
        console.log("编辑、新增 成功！1"," return false");
        return false;
    });
	
	//初始化查询一次
	B.ajaxQuery(params);
	console.log("liu ok");
	/*---------- start -----------*/
	var myScroll,pullUpEl, pullUpOffset,
	generatedCount = 0;
	
//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
/// var c = '130981199312253466';
///var res= IdentityCodeValid(c);
//成功返回  "" 验证失败返回相应错误信息
   
loaded();
function loaded() {
		/*pullDownEl = document.getElementById('pullDown');
   		pullDownOffset = pullDownEl.offsetHeight;*/
   
		pullUpEl = document.getElementById('pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		
		myScroll = new iScroll('wrapper', {
			useTransition: false,
			onRefresh: function () {
				/*if (pullDownEl.className.match('loading')) {
			      pullDownEl.className = '';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			     } else*/ if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					//<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...'; -->
				}
				console.log("++++++++++++++++onRefresh+++++++++++++");
			},
			onScrollMove: function () {
				/*if (this.y > 5 && !pullDownEl.className.match('flip')) {
			      pullDownEl.className = 'flip';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
			      this.minScrollY = 0;
			     } else if (this.y < 5 && pullDownEl.className.match('flip')) {
			      pullDownEl.className = '';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			      this.minScrollY = -pullDownOffset;
			     } else*/ if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
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
				/*if (pullDownEl.className.match('flip')) {
			      pullDownEl.className = 'loading';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
			      pullUpAction("true"); // Execute custom function (ajax call?)
			    } else*/ if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					/* pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...'; */			
					pullUpAction("false");	// Execute custom function (ajax call?)
				}
				console.log("++++++++++++++++onScrollEnd+++++++++++++");
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
		el = document.getElementById('div_component_list');

	
console.log("++++++++++++++++hasChildNodes+++++++++++++",document.getElementById('div_component_list').children.length)
		//var pageNo=(document.getElementById('div_component_list').getElementsByTagName('div').length-2)/10+1;
		//var pageNo=($('#div_component_list').children('div').length-2)/4+1;
		var pageNo;
		var pageSize= 8;
		params.rows = 8;
		if (start == "true") {
			/*pageNo=(document.getElementById('div_component_list').children.length)/3-1;
			pageNo = parseInt(pageNo);
			pageNo = pageNo <= 1 ? 1 : pageNo;
			params.page = params.page-1;
			params.page = params.page <= 1 ? 1 : params.page;*/
		} else{
			pageNo=(document.getElementById('div_component_list').children.length-1)/params.rows+1;
			params.page =  pageNo >= params.totalPageNum ? params.totalPageNum : pageNo ;//pageNo ; //params.page+1;
		}
		
		
		///pageNo = parseInt(pageNo);
		console.log(parseInt(pageNo)+"+++++++"+params.totalPageNum+"+++++++++"+pageNo+"+++++++++++++",parseInt(pageNo)!=pageNo)
		
		myScroll.refresh();
		if(parseInt(pageNo)!=pageNo){
			params.page = pageNo >= params.totalPageNum ? params.totalPageNum : pageNo ;
			document.getElementById('pullUp').style.display="none";
			console.log("++++++++++++++++ return +++++++++++++",params)
			return;
		}
		
		
		
		/*if(params.totalPageNum!="" &&  params.totalPageNum >= params.page){
			params.page = params.totalPageNum;
			document.getElementById('pullUp').style.display="none";
			return;
		}*/
		
	console.log("+++++++++++++++++++++",params)
	
	isReplace = true;
	var pageSizeTemp = params.page * params.rows -1;
	var paramsTemp={ 
				page: 1,
				rows: pageSizeTemp,
				totalPageNum: params.totalPageNum,
				user_clue_id: urlparam.user_clue_id
	}
	console.log("+++++++++ return ++++++++++++",params)
	///isReplace = false;
	///B.ajaxQuery(params);
	B.ajaxQuery(paramsTemp);
	
	}, 20);	// <-- Simulate network congestion, remove setTimeout from production!
}


document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 100); }, false);

	/*---------- end -----------*/

})

function pass_para_popup(passed){
	
	//console.log('pass_para_popup()!!!' , passed );
	$('body').popup({
        title:'',//表单提交
        id:'pop-1'
        ,formId:'form-1'
        ,closeOnOk:true
        ,ok:'确认'
        ,onOk:function(){
        	//console.log('$(#form-1)!!!' , $('#form-1') );
        	//console.log('pass_para_popup()!!!' , $('#form-1')[0] );
        	$('#form-1')[0].setAttribute("data-id",passed);
            $('#form-1').submit();
            //alert('我是确认按钮'+passed);
        }
        ,cnacel:"取消"
        ,onCancel : function() {
        	//alert('我是取消按钮');
    	}
    });
     
}

function pass_para_popup_edit(passed){
	
	passed = JSON.parse(passed);
	console.log('pass_para_popup()!!!' , passed );
	
	/*for (var ii in passed) {
		console.log(ii , passed[ii] );
	}*/
	console.log('!!!'+passed.insure_name+"!!" , $('#form-add')[0].getElementsByTagName('input')[0]);
	$('#form-add')[0].getElementsByTagName('input')[0].value = passed.insure_name;
	$('#form-add')[0].getElementsByTagName('input')[1].value = passed.id_card;
	$('#form-add')[0].getElementsByTagName('input')[2].value = passed.insurance_time ? passed.insurance_time : "";
	$('#form-add')[0].getElementsByTagName('input')[3].value = passed.insurance_type;
	$('#form-add')[0].getElementsByTagName('input')[4].value = passed.insure_begintime ? passed.insure_begintime : "";
	$('#form-add')[0].getElementsByTagName('input')[5].value = passed.insure_endtime ? passed.insure_endtime : "";
	$('#form-add')[0].getElementsByTagName('span')[0].innerHTML = "";
	$('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "";
	$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "";
	$('#form-add')[0].getElementsByTagName('span')[3].innerHTML = "";
	$('#form-add')[0].getElementsByTagName('span')[4].innerHTML = "";
	$('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "";
	console.log('pass_para_popup()!!!insurance_time ' , passed.insurance_time );
	$('body').popup({
        title:'',//表单提交
        id:'pop-1'
        ,formId:'form-add'
        ,closeOnOk:false
        ,ok:'修改'
        ,onOk:function(){
        	//console.log('$(#form-1)!!!' , $('#form-1') );
        	$('#form-add')[0].setAttribute("data-id",passed.id );
        	
        	console.log('input 修改 !!!  submit' ,$('#form-add')[0].getElementsByTagName('input')[0].value);
        	 //最强验证日期的正则表达式,添加了闰年的验证。   
			var regDate = /(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)/;
				
			var flagVerification = 0;
        	if ($('#form-add')[0].getElementsByTagName('input')[0].value != "") {
        		flagVerification = 1;
        		$('#form-add')[0].getElementsByTagName('span')[0].innerHTML = "";
        	}else{
        		flagVerification = 0;
        		$('#form-add')[0].getElementsByTagName('span')[0].innerHTML = "格式不符或为空!";
        	}
        	console.log('input 修改 !!!  span' ,$('#form-add')[0].getElementsByTagName('span')[0]);
        	
        	var flagVerification1 = 0;
        	if ($('#form-add')[0].getElementsByTagName('input')[1].value != "") {
        		
        		var num = $('#form-add')[0].getElementsByTagName('input')[1].value;
        		num = num.toUpperCase();
        		console.log('input num submit',num );
        		///$('#form-add')[0].getElementsByTagName('input')[0].placeholder = num;
			    
			    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
			    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
				console.log('input num submit11',!reg.test(num) );
				console.log('input num submit length ',$('#form-add')[0].getElementsByTagName('input')[1].value.length);
			    
				if(!reg.test(num)) {
					//if (!(/(^/d{15}$)|(^/d{17}([0-9]|X)$)/.test(num))) {
			        //alert('输入的身份证号长度不对，或者号码不符合规定！/n15位号码应全为数字，18位号码末位可以为数字或X。');
			        flagVerification1 =  0;
			        $('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "格式不符或长度不对!";
				}else{
					flagVerification1 = 1;
					$('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "";
				}
				///严格 身份证号校验
				var strictValid = IdentityCodeValid(num);
				if (strictValid != "") {
					flagVerification1 =  0;
			        $('#form-add')[0].getElementsByTagName('span')[1].innerHTML = strictValid;
				} else{
					flagVerification1 = 1;
					$('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "";
				}
				
        		
        	}else{
        		flagVerification1 = 0;
        		$('#form-add')[0].getElementsByTagName('span')[1].innerHTML = "格式不符或为空!";
        	}
        	
        	var  flagVerification2 =  0;
        	if ($('#form-add')[0].getElementsByTagName('input')[2].value != "") {
        		var num = $('#form-add')[0].getElementsByTagName('input')[2].value;
				console.log(num+'input num submit==',!regDate.test(num) );
				if(!regDate.test(num)) {
			        flagVerification2 =  0;
			        $('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "格式不符或长度不对!";
				}else{
			        	//$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "日期不能大于当今天!";
					flagVerification2 = 1;
					$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "";
				}
        	}else{
        		flagVerification2 = 0;
        		$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "格式不符或为空!格式2015-01-01";
        	}
        	///投保期限 开始
        	//var tt = $('#form-add')[0].find('label').attr('id','fconnectionSymbol') //getElementsByTagName('label').find("") //
        	//$('#fconnectionSymbol').show();
			///$('#fconnectionSymbol')[0].style.display = 'none';
			//$('#form-add label').eq(9).val() = '';
			//$('#fconnectionSymbol').hide();
        	var flagVerification4 =  0;
        	///$('#form-add input').eq(3).val()
        	if ($('#form-add')[0].getElementsByTagName('input')[4].value != "") {
        		var num = $('#form-add')[0].getElementsByTagName('input')[4].value;
				console.log(num+'input num submit==',!regDate.test(num) );
				if(!regDate.test(num)) {
			        flagVerification4 =  0;
			        $('#form-add')[0].getElementsByTagName('span')[4].innerHTML = "开始格式不符!";
				}else{
			        	//$('#form-add')[0].getElementsByTagName('span')[2].innerHTML = "日期不能大于当今天!";
					flagVerification4 = 1;
					$('#form-add')[0].getElementsByTagName('span')[4].innerHTML = "";
				}
        	}else{
        		flagVerification4 = 1;
        	}
        	///投保期限 结束
        	var flagVerification5 =  0;
        	if ($('#form-add')[0].getElementsByTagName('input')[5].value != "") {
        		var num = $('#form-add')[0].getElementsByTagName('input')[5].value;
				console.log(num+'input num submit==',!regDate.test(num) );
				if(!regDate.test(num)) {
			        flagVerification5 = 0;
			        $('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "结束格式不符!";
				}else{
					var num4 = $('#form-add')[0].getElementsByTagName('input')[4].value;
					if ($('#form-add')[0].getElementsByTagName('input')[4].value != "" && regDate.test(num4)) {
	    				if(num >= num4) {
	    					flagVerification5 = 1;
							$('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "";
	    				} else{
							flagVerification5 = 0;
    						$('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "开始比结束大！";
						}
	    				
					} else{
						flagVerification5 = 1;
						$('#form-add')[0].getElementsByTagName('span')[5].innerHTML = "";
					}
					
				}
        	}else{
        		flagVerification5 = 1;
        	}
    
    		var flagVerifications = flagVerification + flagVerification1 + flagVerification2 + flagVerification4 + flagVerification5;
    		
            if (flagVerifications == 5 ) {
            	$('#form-add').submit();
            	$("#pop-1").trigger("close");
            }
            //alert('我是确认按钮'+passed);
        }
        ,cnacel:"取消"
        ,onCancel : function() {
        	//alert('我是取消按钮');
    	}
    });
     
}





