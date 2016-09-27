 var myScroll,pullUpEl, pullUpOffset,
	generatedCount = 0;
	
	//var URL="https://brokeraid.100credit.com/",     //测试
    /*var URL="http://192.168.162.108:8080/minions/",*/    //108
    var URL = "https://brotest.100credit.com/",

	function loaded() {
		pullDownEl = document.getElementById('pullDown');
   		pullDownOffset = pullDownEl.offsetHeight;
   
		pullUpEl = document.getElementById('pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		
		myScroll = new iScroll('wrapper', {
			useTransition: false,
			onRefresh: function () {
				if (pullDownEl.className.match('loading')) {
			      pullDownEl.className = '';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
			     } else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					//<!-- pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...'; -->
				}
				console.log("++++++++++++++++onRefresh+++++++++++++");
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
				if (pullDownEl.className.match('flip')) {
			      pullDownEl.className = 'loading';
			      pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
			      pullUpAction("true"); // Execute custom function (ajax call?)
			    } else if (pullUpEl.className.match('flip')) {
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
	
	console.log("++++++++++++++++--------------++++++");
	var params={ 
				page: 1,
				rows: '',
				total: "",
				totalPageNum: "",
				user_clue_id: 236
			}
	
	
function pullUpAction (start) {
	
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li;
		el = document.getElementById('div_component_list');

	
console.log("++++++++++++++++hasChildNodes+++++++++++++",document.getElementById('div_component_list').children.length)
		//var pageNo=(document.getElementById('div_component_list').getElementsByTagName('div').length-2)/10+1;
		//var pageNo=($('#div_component_list').children('div').length-2)/4+1;
		var pageNo;
		if (start == "true") {
			pageNo=(document.getElementById('div_component_list').children.length)/3-1;
			pageNo = parseInt(pageNo);
			pageNo = pageNo <= 1 ? 1 : pageNo;
			params.page = params.page-1;
			params.page = params.page <= 1 ? 1 : params.page;
		} else{
			//pageNo=(document.getElementById('div_component_list').children.length)/3+1;
			params.page = params.page+1;
			
			if(params.totalPageNum!="" &&  params.totalPageNum >= params.page){
				params.page = params.totalPageNum;
			}
		}
		
		
		pageNo = parseInt(pageNo);
		console.log(parseInt(pageNo)+"+++++++"+start+"+++++++++"+pageNo+"+++++++++++++",parseInt(pageNo)!=pageNo)
		
		if(parseInt(pageNo)!=pageNo){
			document.getElementById('pullUp').style.display="none";
			//return;
		}
		var pageSize= 3;
		params.rows = 3;
		console.log("+++++++++return++++++++++++",params)
		
		if(params.totalPageNum!="" &&  params.totalPageNum >= params.page){
			params.page = params.totalPageNum;
			document.getElementById('pullUp').style.display="none";
			return;
		}
		
	console.log("+++++++++++++++++++++",params)
	
	$.ajax({
			                //url: "https://brokeraid.100credit.com/menu/list.action",
			                //url: "",
			                url: URL + "/mySaleCule/perfectSelect.action",
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
									
										console.log(data.data.totalPageNum+"+++++++++++++++++++++",params)
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
												l.setAttribute("data-id",data_list[i].id);
												//$('.content_sale').append(l);
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
													
												//l.getElementsByTagName('p')[5].getElementsByTagName('span')[1].innerHTML=data_list[i].match_time;
												//投保险种：
												l.getElementsByTagName('div')[2].getElementsByTagName('span')[1].innerHTML = data_list[i].insurance_type;
												//投保期限：
												var begintimeArr = data_list[i].insure_begintime ? data_list[i].insure_begintime.split('-') : "";
												var begintimeFormat = begintimeArr ? begintimeArr[0]+"年"+begintimeArr[1]+"月"+begintimeArr[2]+"日" : "";
												
												var endtimeArr = data_list[i].insure_endtime ? data_list[i].insure_endtime.split('-') : "";
												var endtimeFormat = endtimeArr ? endtimeArr[0]+"年"+endtimeArr[1]+"月"+endtimeArr[2]+"日" : "";
												
												l.getElementsByTagName('div')[3].getElementsByTagName('span')[1].innerHTML = begintimeFormat + "~"+endtimeFormat;
												
													
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
									//window.location.href="noResult.html";
									console.log("查询完善销售线索失败！738",data.message)
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