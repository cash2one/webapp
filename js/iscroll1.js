 var myScroll,pullUpEl, pullUpOffset,
	generatedCount = 0;

	function loaded() {
		pullUpEl = document.getElementById('pullUp');	
		pullUpOffset = pullUpEl.offsetHeight;
		
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
					myScroll.refresh();
				}
			}
		});
		
		if(document.getElementById('wrapper')){
			document.getElementById('wrapper').style.left = '0';
		}
		
		/* setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 10); */
	}
	
	

function pullUpAction () {
	
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li;
		el = document.getElementById('thelist');

	

		var pageNo=(document.getElementById('thelist').getElementsByTagName('li').length-2)
		/8+1;
		
		if(parseInt(pageNo)!=pageNo){
			document.getElementById('pullUp').style.display="none";
			return;
		}
		
		var pageSize=8;
		
	
		var params={
					pageNo:pageNo,
					pageSize:pageSize
		}
	
	
	//var URL="https://brokeraid.100credit.com/",     //测试
    /*var URL="http://192.168.162.108:8080/minions/",*/    //108
    var URL = "https://brotest.100credit.com/";
	$.ajax({
                url: URL + "menu/list.action",
		//url: "http://192.168.162.192:8080/minions/menu/list.action",
                type: "get",
                data: params,
		        dataType : 'jsonp',
                async: true,
                success: function(data) {
					if(typeof data == 'string'){
						var data = JSON.parse(data);
					}
	
					
							 
					if(data.code==703){
						var data_list=data.data.list;

						for(var i=0;i<data_list.length;i++){
							//匹配成功
							if(data_list[i].match_code=="1"){
								var aaa=$(".pipeiLi").html();
								var l=$('<li class="pipeiLi" data-id="'+data_list[i].time_id+'">'+aaa+'</li>');//����һ��li
								$('.contentM ul').append(l);
								$('.contentM ul').on('click', 'li', function(e){
									var id=$(this).attr("data-id");
									window.location.href='huaxiang.html?time_id='+id;
								})
								if(data_list[i].sex=="1"){
									l.find('p').eq(0).find('span')[1].innerHTML='<img src="images/man.png">';
								}else if(data_list[i].sex=="2"){
									l.find('p').eq(0).find('span')[1].innerHTML='<img src="images/woman.png">';
								}else if(data_list[i].sex=="0"){
									l.find('p').eq(0).find('span')[1].innerHTML='<img src="images/sex.png">';
									l.find('p').eq(0).find('span')[3].innerHTML='<img src="images/id_nopipei.png">';
								}
								l.find('p').eq(0).find('span')[2].innerHTML=data_list[i].username;
								l.find('p').eq(4).find('span')[0].innerHTML=data_list[i].match_time.substring(0,16);

								//�Ƹ�财富����
								var wealth_num=parseInt(data_list[i].wealth_num);
								var star2Num=6-wealth_num;
								l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].innerHTML="";
								for(var j=0;j<wealth_num;j++){
									var s1=document.createElement("span");
									s1.className="starLiImg1";
									s1.innerHTML='<img src="images/star.png">';
									l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].appendChild(s1);
								}

								for(var k=0;k<star2Num;k++){
									var s2=document.createElement("span");
									s2.className="starLiImg1";
									s2.innerHTML='<img src="images/star2.png">';
									l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].appendChild(s2);
								}


								//�需求�������
								var needs_num=parseInt(data_list[i].needs_num);
								var nstar2Num=6-needs_num;
								l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].innerHTML="";
								for(var j=0;j<needs_num;j++){
									var s1=document.createElement("span");
									s1.className="starLiImg1";
									s1.innerHTML='<img src="images/star.png">';
									l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].appendChild(s1);
								}

								for(var k=0;k<nstar2Num;k++){
									var s2=document.createElement("span");
									s2.className="starLiImg1";
									s2.innerHTML='<img src="images/star2.png">';
									l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].appendChild(s2);
								}

								l.onclick=function(){
									window.location.href='huaxiang.html?time_id='+data_list[i].time_id;
								};

								l.getElementsByTagName('p')[4].getElementsByTagName('span')[1].getElementsByTagName('a')[0].href='huaxiang.html?time_id='+data_list[i].time_id;

							}else if(data_list[i].match_code=="0"){
								var l=document.createElement('li');//����һ��li
								var aaa=$(".pipeiLi").html();
								console.log("aaa",aaa);
								l.innerHTML=aaa;
								l.className="pipeiLi";
								l.setAttribute("data-id",data_list[i].time_id);
								$('.contentM ul').append(l);

								if(data_list[i].sex=="1"){
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML='<img src="images/man.png">';
								}else if(data_list[i].sex=="2"){
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML='<img src="images/woman.png">';
								}else if(data_list[i].sex=="0"){
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML='<img src="images/sex.png">';
									l.getElementsByTagName('p')[0].getElementsByTagName('span')[3].innerHTML='<img src="images/id_nopipei.png">';
								}
								l.getElementsByTagName('p')[0].getElementsByTagName('span')[2].innerHTML=data_list[i].username;
								l.getElementsByTagName('p')[4].getElementsByTagName('span')[0].innerHTML=data_list[i].match_time.substring(0,16);

								//�Ƹ�财富����
								var wealth_num=parseInt(data_list[i].wealth_num);
								var star2Num=6-wealth_num;
								l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].innerHTML="";
								for(var j=0;j<wealth_num;j++){
									var s1=document.createElement("span");
									s1.className="starLiImg1";
									s1.innerHTML='<img src="images/star.png">';
									l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].appendChild(s1);
								}

								for(var k=0;k<star2Num;k++){
									var s2=document.createElement("span");
									s2.className="starLiImg1";
									s2.innerHTML='<img src="images/star2.png">';
									l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].appendChild(s2);
								}


								//�需求�������
								var needs_num=parseInt(data_list[i].needs_num);
								var nstar2Num=6-needs_num;
								l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].innerHTML="";
								for(var j=0;j<needs_num;j++){
									var s1=document.createElement("span");
									s1.className="starLiImg1";
									s1.innerHTML='<img src="images/star.png">';
									l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].appendChild(s1);
								}

								for(var k=0;k<nstar2Num;k++){
									var s2=document.createElement("span");
									s2.className="starLiImg1";
									s2.innerHTML='<img src="images/star2.png">';
									l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].appendChild(s2);
								}
								l.getElementsByTagName('p')[4].getElementsByTagName('span')[1].className="nodataLiA";
								l.getElementsByTagName('p')[4].getElementsByTagName('span')[1].getElementsByTagName('a')[0].innerHTML="未匹配成功";
							}
							
						}
								myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
						
					}else if(data.code==715){
						console.log("session为空,请重新登录");
						$(".bg_content_nochecked").css("display","block");
						$(".content_sessionNull").css("display","block");
						localStorage.removeItem("uid");
						localStorage.removeItem("upwd");
						localStorage.removeItem("flag");
						localStorage.removeItem("sid");
						localStorage.removeItem("device_id");
					}else if(data.code==718){
						console.log("您的账号已在其他设备上登陆");
						$(".bg_content_nochecked").css("display","block");
						$(".content_other").css("display","block");
						localStorage.removeItem("uid");
						localStorage.removeItem("upwd");
						localStorage.removeItem("flag");
						localStorage.removeItem("sid");
						localStorage.removeItem("device_id");
					}else if(data.code==722){
						console.log("内部错误");
						$(".bg_content_nochecked").css("display","block");
						$(".content_contact").css("display","block");
					}
					else{
						console.log("查询失败！")
					}
						
					
                }
		})


	}, 20);	// <-- Simulate network congestion, remove setTimeout from production!
}

	

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

//document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 100); }, false);