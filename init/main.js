Zepto(function($) {

	$('.mainBtn').click(function() {
		var aaa = $(".pipeiLi").html();
		window.location.href = "pipei.html?br_status=" + 1;
	});
	//ȷ��--���µ�¼
	$(".finish_sure").click(function() {
		location.href = "login.html";
	});
	//722�ڲ�����---ȡ��
	$(".cancel").click(function() {
		$(".bg_content_nochecked").css("display", "none");
		$(".content_contact").css("display", "none");
	});
	var pageNo = 1;
	var pageSize = 8;

	var params = {
			pageNo: pageNo,
			pageSize: pageSize
		}
		// var _pathUrl = "https://brokeraid.100credit.com/";
		 var URL = "http://192.168.162.192:8080/minions/";
//	var URL = "https://brotest.100credit.com/";
	$.ajax({
		url: URL + "menu/list.action",
		type: "get",
		data: params,
		dataType: 'jsonp',
		async: true,
		success: function(data) {
			if (typeof data == 'string') {
				var data = JSON.parse(data);
			}

			if (data.code == 703) {
				var data_list = data.data.list;

				for (var i = 0; i < data_list.length; i++) {
					//ƥ��ɹ�

					if (data_list[i].match_code == "1") {

						var l = document.createElement('li'); //����һ��li
						var aaa = $(".pipeiLi").html();
						console.log("aaa", aaa);
						l.innerHTML = aaa;
						l.className = "pipeiLi";
						l.setAttribute("data-id", data_list[i].time_id);
						$('.contentM ul').append(l);
						l.onclick = function() {
							var id = $(this).attr("data-id");
							window.location.href = 'huaxiang.html?time_id=' + id;
						};
						if (data_list[i].sex == "1") {
							l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML = '<img src="images/man.png">';
						} else if (data_list[i].sex == "2") {
							l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML = '<img src="images/woman.png">';
						} else if (data_list[i].sex == "0") {
							l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML = '<img src="images/sex.png">';
							l.getElementsByTagName('p')[0].getElementsByTagName('span')[3].innerHTML = '<img src="images/id_nopipei.png">';
						}
						l.getElementsByTagName('p')[0].getElementsByTagName('span')[2].innerHTML = data_list[i].username;
						l.getElementsByTagName('p')[4].getElementsByTagName('span')[0].innerHTML = data_list[i].match_time.substring(0, 16);

						//�Ƹ�财富����
						var wealth_num = parseInt(data_list[i].wealth_num);
						var star2Num = 6 - wealth_num;
						l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].innerHTML = "";
						for (var j = 0; j < wealth_num; j++) {
							var s1 = document.createElement("span");
							s1.className = "starLiImg1";
							s1.innerHTML = '<img src="images/star.png">';
							l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].appendChild(s1);
						}

						for (var k = 0; k < star2Num; k++) {
							var s2 = document.createElement("span");
							s2.className = "starLiImg1";
							s2.innerHTML = '<img src="images/star2.png">';
							l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].appendChild(s2);
						}

						//�需求�������
						var needs_num = parseInt(data_list[i].needs_num);
						var nstar2Num = 6 - needs_num;
						l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].innerHTML = "";
						for (var j = 0; j < needs_num; j++) {
							var s1 = document.createElement("span");
							s1.className = "starLiImg1";
							s1.innerHTML = '<img src="images/star.png">';
							l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].appendChild(s1);
						}

						for (var k = 0; k < nstar2Num; k++) {
							var s2 = document.createElement("span");
							s2.className = "starLiImg1";
							s2.innerHTML = '<img src="images/star2.png">';
							l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].appendChild(s2);
						}

						l.getElementsByTagName('p')[4].getElementsByTagName('span')[1].getElementsByTagName('a')[0].href = 'huaxiang.html?time_id=' + data_list[i].time_id;

					} else if (data_list[i].match_code == "0") {
						var l = document.createElement('li'); //����һ��li
						var aaa = $(".pipeiLi").html();
						console.log("aaa", aaa);
						l.innerHTML = aaa;
						l.className = "pipeiLi";
						l.setAttribute("data-id", data_list[i].time_id);
						$('.contentM ul').append(l);

						if (data_list[i].sex == "1") {
							l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML = '<img src="images/man.png">';
						} else if (data_list[i].sex == "2") {
							l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML = '<img src="images/woman.png">';
						} else if (data_list[i].sex == "0") {
							l.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerHTML = '<img src="images/sex.png">';
							l.getElementsByTagName('p')[0].getElementsByTagName('span')[3].innerHTML = '<img src="images/id_nopipei.png">';
						}
						l.getElementsByTagName('p')[0].getElementsByTagName('span')[2].innerHTML = data_list[i].username;
						l.getElementsByTagName('p')[4].getElementsByTagName('span')[0].innerHTML = data_list[i].match_time.substring(0, 16);

						//�Ƹ�财富����
						var wealth_num = parseInt(data_list[i].wealth_num);
						var star2Num = 6 - wealth_num;
						l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].innerHTML = "";
						for (var j = 0; j < wealth_num; j++) {
							var s1 = document.createElement("span");
							s1.className = "starLiImg1";
							s1.innerHTML = '<img src="images/star.png">';
							l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].appendChild(s1);
						}

						for (var k = 0; k < star2Num; k++) {
							var s2 = document.createElement("span");
							s2.className = "starLiImg1";
							s2.innerHTML = '<img src="images/star2.png">';
							l.getElementsByTagName('p')[2].getElementsByTagName('span')[1].appendChild(s2);
						}

						//�需求�������
						var needs_num = parseInt(data_list[i].needs_num);
						var nstar2Num = 6 - needs_num;
						l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].innerHTML = "";
						for (var j = 0; j < needs_num; j++) {
							var s1 = document.createElement("span");
							s1.className = "starLiImg1";
							s1.innerHTML = '<img src="images/star.png">';
							l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].appendChild(s1);
						}

						for (var k = 0; k < nstar2Num; k++) {
							var s2 = document.createElement("span");
							s2.className = "starLiImg1";
							s2.innerHTML = '<img src="images/star2.png">';
							l.getElementsByTagName('p')[3].getElementsByTagName('span')[1].appendChild(s2);
						}
						l.getElementsByTagName('p')[4].getElementsByTagName('span')[1].className = "nodataLiA";
						l.getElementsByTagName('p')[4].getElementsByTagName('span')[1].getElementsByTagName('a')[0].innerHTML = "未匹配成功";
					}
				}

				loaded();

			} else if (data.code == 716) {
				window.location.href = "noResult.html";
			} else if (data.code == 715) {
				console.log("sessionΪ��,�����µ�¼");
				$(".bg_content_nochecked").css("display", "block");
				$(".content_sessionNull").css("display", "block");
				localStorage.removeItem("uid");
				localStorage.removeItem("upwd");
				localStorage.removeItem("flag");
				localStorage.removeItem("sid");
				localStorage.removeItem("device_id");
			} else if (data.code == 718) {
				console.log("����˺����������豸�ϵ�½");
				$(".bg_content_nochecked").css("display", "block");
				$(".content_other").css("display", "block");
				localStorage.removeItem("uid");
				localStorage.removeItem("upwd");
				localStorage.removeItem("flag");
				localStorage.removeItem("sid");
				localStorage.removeItem("device_id");
			} else if (data.code == 722) {
				console.log("�ڲ�����");
				$(".bg_content_nochecked").css("display", "block");
				$(".content_contact").css("display", "block");
			} else {
				console.log("��ѯʧ�ܣ�")
			}

		}
	})

})