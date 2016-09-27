 var myScroll,pullUpEl, pullUpOffset,
	generatedCount = 0;

	//var URL="https://brokeraid.100credit.com/",     //测试
    var URL="http://192.168.162.108:8080/minions/",    //108
//  var URL = "https://brotest.100credit.com/",

	function loaded() {
		pullDownEl = document.getElementById('pullDown');
   		pullDownOffset = pullDownEl.offsetHeight;
   
		pullUpEl = document.getElementById('pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		
		myScroll = new iScroll('wrapper', {
			useTransition: true,
			onRefresh: function () {
				
				if (pullDownEl.className.match('loading')) {
			      pullDownEl.className = '';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			     } else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					//<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...'; -->
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
			      pullDownEl.className = 'flip';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
			      this.minScrollY = 0;
			     } else if (this.y < 5 && pullDownEl.className.match('flip')) {
			      pullDownEl.className = '';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			      this.minScrollY = -pullDownOffset;
			     } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
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
				console.log("++++++++++++++++715+++++++++++++",pullUpEl.className)
				if (pullDownEl.className.match('flip')) {
			      pullDownEl.className = 'loading';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
			      pullUpAction("true"); // Execute custom function (ajax call?)
			    } else if (pullUpEl.className.match('flip')) {
					console.log("++++++++++++++++71+++++++++++++")
					pullUpEl.className = 'loading';
					/* pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...'; */			
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

	

		//var pageNo=(document.getElementById('div_component_list').getElementsByTagName('div').length-2)/10+1;
		//var pageNo=($('#div_component_list').children('div').length-2)/4+1;
		var pageNo;
		if (start == "true") {
			pageNo=(document.getElementById('div_component_list').children.length)/5-1;
			pageNo = parseInt(pageNo);
			pageNo = pageNo <= 1 ? 1 : pageNo;
			
		} else{
			pageNo=(document.getElementById('div_component_list').children.length)/5+1;
		}
		//pageNo = 1
		
		console.log(parseInt(pageNo)+"+++++++"+start+"+++++++++"+pageNo+"+++++++++++++",parseInt(pageNo)!=pageNo)
		
		if(parseInt(pageNo)!=pageNo){
			document.getElementById('pullUp').style.display="none";
			return;
		}
		console.log("++++++++++++++++pullUpAction+++++++++++++",pageNo)
		var pageSize= 5;
		
	//orderContact 是否联系排序  1 联系在前 0未联系在前 
	//orderTime 时间排序  1降序 0 升序
		var params={
					currentPage:pageNo,
					pageSize:pageSize, 
					orderContact: 1, 
				orderTime: 1
		}
	console.log("+++++++++++++++++++++",params)
	
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
					
					if (!data_list || data_list.length == 0) {
						var ll=document.createElement('div');//创建一个div
						//var aaa=$(".xiansuo_info").html();
						ll.innerHTML="没有数据!";
						ll.className="xiansuo_info";
						//console.log("div_component_list000",$("#div_component_list")[0])
						$('.content_sale').append(ll);
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
								var l=document.createElement('div');//创建一个div
								//var aaa=$(".xiansuo_info").html();
								//var aaa=$("#div-mySalesInfo").html();
								var aaa=$("#div-mySalesInfo").clone().html();
								//console.log("aaa",aaa)
								l.innerHTML=aaa;
								l.className="xiansuo_info";
								//l.setAttribute("data-id",data_list[i].time_id);
								//$('.contentM ul').append(l);
								l.setAttribute("data-id",data_list[i].user_clue_id);
								//$('.content_sale').append(l);
								el.appendChild(l, el.childNodes[0]);
								
								/*if(data_list[i].sex=="1"){
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='<img src="images/m1.jpg">&nbsp;'+data_list[i].username;
								}else if(data_list[i].sex=="2"){
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='<img src="images/m2.jpg">&nbsp;'+data_list[i].username;
								}else{
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[0].innerHTML='&nbsp;'+data_list[i].username;
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML='<img src="images/id2.jpg">';
								}*/
								
								l.getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML = data_list[i].name ? data_list[i].name : '&nbsp; ' ; //name  province真实的 
									
								l.getElementsByTagName('div')[0].getElementsByTagName('span')[1].getElementsByTagName('a')[0].onclick = new Function("pass_para_popup('" + JSON.stringify(data_list[i].user_clue_id) + "');");
									
								l.getElementsByTagName('div')[2].getElementsByTagName('span')[0].innerHTML=data_list[i].last_browse_time;
								
								///险种
								l.getElementsByTagName('div')[1].getElementsByTagName('ul')[0].innerHTML = "";
								//险种是字符不是对象，需要转换为对象
								var insuranceTypeArr = data_list[i].insurance_type;//'{"健康险":3,"少儿险":1,"意外险":2,"旅游险":2,"理财险":2}';
								//console.log("string  .insurance_type",insuranceTypeArr);
								insuranceTypeArr = JSON.parse(insuranceTypeArr);
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
								l.onclick = new Function("pass_para_popup_link('" + stringObj + "');");
								
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
				}else if (data.code == 715){
					//window.location.href="login.html"
					console.log("查询失败！715",data.message)
                }else{
					console.log("查询失败！",data.message)
				}
					
				
            }
				});

	}, 20);	// <-- Simulate network congestion, remove setTimeout from production!
}

	

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 100); }, false);