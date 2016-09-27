Zepto(function($){
	
	
	//var URL="https://brokeraid.100credit.com/",     //测试
    /*var URL="http://192.168.162.108:8080/minions/",*/    //108
    var URL = "https://brotest.100credit.com/",
	var B = {};
	var isContact = true;
	var isTime = true;
	var isShowEdit = false;
	//orderContact 是否联系排序  1 联系在前 0未联系在前 
	//orderTime 时间排序  1降序 0 升序 
	var params={
				currentPage: 1,
				pageSize: 8,
				total: 1,
				orderContact: 1, 
				orderTime: 1
	}
	
	//当前页中所有记录的数据id，存放到一个数组中，为了解决当前页排序问题。
	var  currentPageDataIdArr = [];
	var isReplace = false;
	var isSort = false;
	
	B.ajaxQuery = function(params){
				console.log("ajaxQuery params= ",params)
				$.ajax({
			                //url: "https://brokeraid.100credit.com/menu/list.action",
			                //url: "",
			                url: URL+"/mySaleCule/query.action",
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
									var data_list=data.data.brSaleClueListbrSaleClueList;
									console.log("45 data"+params.total,data)
									params.total = data.data.pageInfo.total;
									console.log("47 data"+params.total,data)
									
									var divComponentListArr = document.getElementById('div_component_list').children;
									//console.log("divComponentListArr= ",divComponentListArr)
									if (!data_list || data_list.length == 0) {
										if(document.getElementById("div_component_list") || document.getElementById("div_component_list").hasChildNodes()){
											//document.getElementById("div_component_list").remove();
											//console.log("divComponentListArr   in = ",divComponentListArr)
											document.getElementById('divResultIsEmpty').style.display = "block";
											///document.getElementById("div_component_list").removeChild(divComponentListArr[x]);//要从大到小删除
											for (var x=1;x<divComponentListArr.length;x++)
											{ 
												divComponentListArr[x].style.display = 'none';
											} 
										}
										var ll=document.getElementById('divResultIsEmpty');//获得一个div
										ll.innerHTML="请返回销售线索获取您的第一位客户!";
										document.getElementById('pullUp').style.display="none";
										//console.log("div_component_list000",$("#div_component_list")[0])
									} else{
										//console.log("hasChildNodes11= ",document.getElementById("div_component_list").hasChildNodes())
										//console.log("hasChildNodes12= ",document.getElementById("div_component_list"))
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
										//console.log("divResultIsEmpty",document.getElementById('divResultIsEmpty'))
										///$("#div_component_list").empty();
										
										//console.log("div_component_list11",$("#div_component_list")[0])
										//console.log("$('.content_sale')11",document.getElementById("div_component_list"))
										//isReplace = true;
										if (isReplace) {
											/*
											 * currentPageDataIdArr 按照当前页面删除
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
												currentPageDataIdArr.push(data_list[i].user_clue_id);
												l.setAttribute("data-id",data_list[i].user_clue_id);
												///$('.content_sale').append(l);
												el.appendChild(l, el.childNodes[0]);
												
												/*if(data_list[i].sex=="1"){
													l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='<img src="images/m1.jpg">&nbsp;'+data_list[i].username;
												}else if(data_list[i].sex=="2"){
													l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='<img src="images/m2.jpg">&nbsp;'+data_list[i].username;
												}else{
													l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='&nbsp;'+data_list[i].username;
													l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML='<img src="images/id2.jpg">';
												}*/
												
												l.getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML = data_list[i].name ? data_list[i].name : '客户&nbsp;'+data_list[i].mobile.substring(0,3)+' '+'****'+' '+data_list[i].mobile.substring(7,11); //name  province真实的
													
												l.getElementsByTagName('div')[0].getElementsByTagName('span')[1].onclick = new Function("pass_para_popup('" + JSON.stringify(data_list[i].user_clue_id) + "');");
												
												l.getElementsByTagName('div')[0].getElementsByTagName('span')[1].style.display = isShowEdit ? "block" : "none";
												
												l.getElementsByTagName('div')[2].getElementsByTagName('span')[0].innerHTML=data_list[i].grab_bill_time;
												
												///险种
												l.getElementsByTagName('div')[1].getElementsByTagName('ul')[0].innerHTML = "";
												//险种是字符不是对象，需要转换为对象
												var insuranceTypeArr = data_list[i].insurance_type;//'{"健康险":3,"少儿险":1,"意外险":2,"旅游险":2,"理财险":2}';
												//console.log("string  .data_list[i].name",data_list[i].name);
												insuranceTypeArr = JSON.parse(insuranceTypeArr);
												
												//为了解决险种过多显示不规则，目前只显示前3险种
												var thirdArr = {};
												var index = 0
												for (var insuranceType in insuranceTypeArr) {
													if (index >= 3) {
											    	 	break;
											    	 }
													//console.log(insuranceType+"index  JSON.parse insurance_type",insuranceTypeArr[insuranceType]);
											    	 thirdArr[insuranceType] = insuranceTypeArr[insuranceType];
											    	 index++;
											    }
												insuranceTypeArr = thirdArr;
												data_list[i].insurance_type = insuranceTypeArr;
												//console.log("JSON.parse insurance_type",insuranceTypeArr);
												//console.log("data_list[i]",data_list[i])
												for(var insuranceType in insuranceTypeArr) {
													var s1 = document.createElement('li');
													s1.innerHTML = insuranceType;
													//console.log("insuranceType",insuranceType);
													//console.log(insuranceTypeArr+ "：insuranceTypeArr ：",insuranceTypeArr[insuranceType]);
												  	l.getElementsByTagName('div')[1].getElementsByTagName('ul')[0].appendChild(s1);
												}
												//联络  1 联系 0否
												if (data_list[i].is_contact == 1) {
													l.getElementsByTagName('div')[1].getElementsByTagName('span')[0].className = "dataLiA";
													l.getElementsByTagName('div')[1].getElementsByTagName('span')[0].getElementsByTagName('a')[0].innerHTML = "已联络";
												} else{
													l.getElementsByTagName('div')[1].getElementsByTagName('span')[0].className = "dataLiB";
													l.getElementsByTagName('div')[1].getElementsByTagName('span')[0].getElementsByTagName('a')[0].innerHTML = "未联络";
												}
												  	
												var stringObj=JSON.stringify(data_list[i]); 
												//console.log("stringObj",stringObj)
												l.getElementsByTagName('div')[0].getElementsByTagName('span')[0].onclick = new Function("pass_para_popup_link('" + stringObj + "');");
												l.getElementsByTagName('div')[1].onclick = new Function("pass_para_popup_link('" + stringObj + "');");
												l.getElementsByTagName('div')[2].onclick = new Function("pass_para_popup_link('" + stringObj + "');");
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
	
	//
	$('#btn-orderContact').click(function(){
		isContact = !isContact;
	    params.orderContact = isContact ? 1 : 0;
	    isReplace = true;
	    console.log(isContact+" isContact="+params.orderContact,params)
	    
	    var pageSizeTemp = params.currentPage * params.pageSize;
	    var paramsTemp={
				currentPage: 1,
				pageSize: pageSizeTemp,
				total: params.total,
				orderContact: params.orderContact, 
				orderTime: params.orderTime
		}
	    //console.log(pageSizeTemp+"orderContact！2"+params.pageSize+"=="+params.currentPage,paramsTemp)
	    B.ajaxQuery(paramsTemp);
	   // return false;
	});
	
	$('#btn-orderTime').click(function(){
		isTime = !isTime;
	    params.orderTime = isTime ? 1 : 0;
	    isReplace = true;
	    console.log(isTime+" isTime="+params.orderTime,params)
	    var pageSizeTemp = params.currentPage * params.pageSize;
	    var paramsTemp={
				currentPage: 1,
				pageSize: pageSizeTemp,
				total: params.total,
				orderContact: params.orderContact, 
				orderTime: params.orderTime
		}
	    //console.log(pageSizeTemp+"orderContact！2"+params.pageSize+"=="+params.currentPage,paramsTemp)
	    B.ajaxQuery(paramsTemp);
	   // return false;
	});
	
	/*
	 *单条删除确认框
	 * 
	 */
	$('#form-1').bind('submit',function(){
        //alert('表单form-1提交oo');
        var user_clue_id =  $('#form-1')[0].getAttribute('data-id');
        console.log("liu ok $('#form-1')",user_clue_id);
        var paramsdel={
				user_clue_id:user_clue_id
		}
       	$.ajax({
                //url: "https://brokeraid.100credit.com/menu/list.action",
                url: URL+"/mySaleCule/delete.action",
                //url: "http://localhost/query.action.php",
                type: "get",
                data: paramsdel,
                async: true,
                dataType : 'jsonp',
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
					
					if(data.code==1){
						isReplace = true;
						var pageSizeTemp = params.currentPage * params.pageSize -1;
					    var paramsTemp={
								currentPage: 1,
								pageSize: pageSizeTemp,
								total: params.total,
								orderContact: params.orderContact, 
								orderTime: params.orderTime
						}
					    //console.log(pageSizeTemp+"orderContact！2"+params.pageSize+"=="+params.currentPage,paramsTemp)
					    B.ajaxQuery(paramsTemp);
						console.log("删除成功！1",data.message);
					}else if(data.code==2){
						//window.location.href="noResult.html";
						console.log("删除失败！2",data.message)
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
	
	//初始化查询一次
	B.ajaxQuery(params);
	console.log("liu ok");
	
	/*---------- start -----------*/
	var myScroll,pullUpEl, pullUpOffset,
	generatedCount = 0;
	
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
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...'; 
				}
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
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开刷新...';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function () {
				console.log("++++++++++++++++715+++++++++++++",pullUpEl.className)
				/*if (pullDownEl.className.match('flip')) {
			      pullDownEl.className = 'loading';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
			      pullUpAction("true"); // Execute custom function (ajax call?)
			    } else */
			    if (pullUpEl.className.match('flip')) {
					console.log("++++++++++++++++71+++++++++++++")
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...'; 			
					pullUpAction("false");	// Execute custom function (ajax call?)
				}
			}
		});
		
		if(document.getElementById('wrapper')){
			document.getElementById('wrapper').style.left = '0';
		}
		
		 /*setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 10);*/ 
	}
	
	

	function pullUpAction (start) {
		
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			var el, li;
			el = document.getElementById('div_component_list');
		
			console.log("document.getElementById('div_component_list').children.length =",document.getElementById('div_component_list').children.length)
			//var pageNo=(document.getElementById('div_component_list').getElementsByTagName('div').length-2)/10+1;
			//var pageNo=($('#div_component_list').children('div').length-2)/4+1;
			var pageNo;
			params.pageSize = 8;
			if (start == "true") {
				/*pageNo=(document.getElementById('div_component_list').children.length)/5-1;
				pageNo = parseInt(pageNo);
				pageNo = pageNo <= 1 ? 1 : pageNo;
				
				params.currentPage = params.currentPage-1;
				params.currentPage = params.currentPage <= 1 ? 1 : params.currentPage;*/
			} else{
				pageNo=(document.getElementById('div_component_list').children.length-1)/params.pageSize+1;
				params.currentPage = pageNo >= params.total ? params.total : pageNo;// pageNo ; // params.currentPage+1;
			}
			//pageNo = 1
			///pageNo = parseInt(pageNo);
			console.log(parseInt(pageNo)+"+++++++"+params.total+"+++++++++"+pageNo+"+++++++++++++",parseInt(pageNo)!=pageNo)
			
			myScroll.refresh();
			if(parseInt(pageNo)!=pageNo){
				params.currentPage = pageNo >= params.total ? params.total : pageNo ;
				document.getElementById('pullUp').style.display="none";
				console.log("++++++++++++++++ return +++++++++++++",params)
				return;
			}
			console.log("++++++++++++++++pullUpAction+++++++++++++",pageNo)
			
			console.log("+++++++++return++++++++++++",params)
			
			/*if(params.total!="" &&  params.total >= params.currentPage){
				params.currentPage = params.total;
				document.getElementById('pullUp').style.display="none";
				return;
			}*/
		console.log("+++++++++++++++++++++",params)
		
		isReplace = true;
		var pageSizeTemp = params.page * params.rows -1;
		var paramsTemp={ 
					page: 1,
					rows: pageSizeTemp,
					totalPageNum: params.totalPageNum
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

/*
 * 跳转页面salesLeadsInfo.html并传参
 * 
 *   province  省份名称
	 city	城市名称
	 area	区县名称
	 browse_count 浏览次数   
	 grab_bill_time 抢单时间 
	 insurance_type 险种  格式 {"健康险":3,"少儿险":1,"意外险":2,"旅游险":2,"理财险":2} 
	 is_contact 是否联系  1 联系 0否 
	 last_browse_time 最后浏览时间   
	 mobile 电话   
	 user_clue_id id
	 user_id: 116
 */
function pass_para_popup_link(passed){
	passed = JSON.parse(passed);
	console.log('pass_para_popup()!!!' , passed );
    var insuranceTypeArr=[];
    for (var item in passed.insurance_type) {
    	 insuranceTypeArr.push(item);
    }
    var insuranceType=insuranceTypeArr.join();
    var uri ="salesLeadsInfo.html?name="+passed.name+"&user_clue_id="+passed.user_clue_id+"&user_id="+passed.user_id+"&mobile="+passed.mobile+"&area="+passed.area+"&city="+passed.city+"&insurance_type="+insuranceType+"&is_contact="+passed.is_contact+"&browse_count="+passed.browse_count+"&last_browse_time="+passed.last_browse_time+"&province="+passed.province;
	console.log('pass_para_popup()!!! +!!!', uri );
	uri = encodeURI(uri)
	//console.log('uri!!!', uri );
	//window.location.href = 'salesLeadsInfo.html';
	window.location.href = uri;
}

///每条 btn-del 删除
function pass_para_popup(passed){
	console.log('pass_para_popup()!!!' , passed );
	$('body').popup({
        title:'删除确认',//表单提交
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
