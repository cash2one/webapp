require([
		'../js/globalService',
		'../js/new',
		'../init/api',
		'../plugins/zepto.min'
	],
	function(gService, NavUI, API) {
		var B = {};
		/*
	B.RESP = {"code":704,"data":{"basicSituation":{"age":"20-30","city":"","eduction":"","havaCar":"2","havaHouse":"2","isHighValue":"1","name":"张超","sex":""}
        ,"brand":[{"brBrand":"手动"},{"brBrand":"问问"},{"brBrand":"这种"},{"brBrand":"分单"},{"brBrand":"咋知道"}],"reading":[
        {"brRead":"是在"},{"brRead":"二维"},{"brRead":"vb"},{"brRead":"水电费"},{"brRead":"问"}],"wealth":
        {"average":"2","payout":"6"}},"message":"查询成功"}
	*/
		B.RESP = {};

		B.POST = {
			time_id: 1
		}
		var _search = getSearch();

		B.init = function() {
			if (!_search.time_id) {
//				window.location.href = './main.html';
			}
			B.POST.time_id = _search.time_id;
			B.getData();
			//确定--重新登录
			$(".finish_sure").click(function() {
				location.href = "login.html";
			});
			//722内部错误---取消
			$(".cancel").click(function() {
				$(".bg_content_nochecked").css("display", "none");
				$(".content_contact").css("display", "none");
			});
			//console.log(window.location)
		}

		B.getData = function() {
			$.ajax({
				url: API['findById.action'],
				type: "get",
				data: B.POST,
				dataType: 'jsonp',
				async: true,
				success: function(data) {
					B.RESP = data;
					if (B.RESP.code == 703) {
						B.addHtml();
						NavUI(data);
					}
					if (B.RESP.code == 715) {
						console.log("session为空,请重新登录");
						$(".bg_content_nochecked").css("display", "block");
						$(".content_sessionNull").css("display", "block");
						localStorage.removeItem("uid");
						localStorage.removeItem("upwd");
						localStorage.removeItem("flag");
						localStorage.removeItem("sid");
						localStorage.removeItem("device_id");
					} else if (B.RESP.code == 718) {
						console.log("您的账号已在其他设备上登陆");
						$(".bg_content_nochecked").css("display", "block");
						$(".content_other").css("display", "block");
						localStorage.removeItem("uid");
						localStorage.removeItem("upwd");
						localStorage.removeItem("flag");
						localStorage.removeItem("sid");
						localStorage.removeItem("device_id");
					} else if (B.RESP.code == 722) {
						console.log("内部错误");
						$(".bg_content_nochecked").css("display", "block");
						$(".content_contact").css("display", "block");
					}
				}
			})
		}

		B.addHtml = function() {
			var basic = B.RESP.data.basicSituation;

			tid = _search.tid ? _search.tid : '';

			$("#userName").html(basic.name);
			$("#userAge").html(basic.age);
			$(".city").html(basic.city);
			$(".xiaofeiMoney").html(basic.city);

			// 性别
			if (basic.sex == 1) {
				$("#sexImg").attr("src", "images/man.png");
			} else if (basic.sex == 2) {
				$("#sexImg").attr("src", "images/woman.png");
			} else {
				$("#sexImg").attr("src", "images/sex.png");
			}

			// 是否有车
			if (basic.havaCar == 1) {
				$("#carImg").attr("src", "images/h4.png");
			} else {
				$("#carImg").attr("src", "images/h44.png");
			}

			//  是否有房
			if (basic.havaHouse == 1) {
				$("#houseImg").attr("src", "images/h3.png");
			} else {
				$("#houseImg").attr("src", "images/h33.png");
			}

			//  是否有高价值客户
			if (basic.isHighValue == 1) {
				$("#highImg").attr("src", "images/h1.png");
			} else {
				$("#highImg").attr("src", "images/h11.png");
			}

			//  年收入等级
			var _average = B.RESP.data.wealth.average;

			$(".c1_part").css("height", 21.33 * parseInt(_average) + "px");

			if (_average == 6) {
				$('.shouruLevel').html("富裕")
			} else if (_average == 5) {
				$('.shouruLevel').html("高收入")
			} else if (_average == 4) {
				$('.shouruLevel').html("中高收入")
			} else if (_average == 3) {
				$('.shouruLevel').html("中等小康")
			} else if (_average == 2) {
				$('.shouruLevel').html("初级小康")
			} else if (_average == 1) {
				$('.shouruLevel').html("低收入")
			} else if (_average == 0) {
				$('.shouruLevel').html("未知")
			}

			var _payout = B.RESP.data.wealth.payout;
			$(".c2_part").css("height", 21.33 * parseInt(_payout) + "px");
			if (_payout == 6) {
				$('.xiaofeiLevel').html("超高消费")
			} else if (_payout == 5) {
				$('.xiaofeiLevel').html("高消费")
			} else if (_payout == 4) {
				$('.xiaofeiLevel').html("中高消费")
			} else if (_payout == 3) {
				$('.xiaofeiLevel').html("中等消费")
			} else if (_payout == 2) {
				$('.xiaofeiLevel').html("中低消费")
			}
			if (_payout == 1) {
				$('.xiaofeiLevel').html("低消费")
			} else if (_payout == 0) {
				$('.xiaofeiLevel').html("未知")
			}

			if ($('.xiaofeiLevel').html() == "未知" && $(".city").html() == "未知") {
				$('.xiaofeiLevel').html("");
			}
			if ($('.shouruLevel').html() == "未知" && $(".city").html() == "未知") {
				$('.shouruLevel').html("");
			}

			//  品牌偏好
			var brd = read = "";
			if (B.RESP.data.brand) {
				for (var i = 0; i < B.RESP.data.brand.length; i++) {
					brd += '<li>' + B.RESP.data.brand[i].brBrand + '</li>';
				}
			}

			$("#brdUl").html(brd);

			//兴趣偏好
			if (B.RESP.data.reading) {
				for (var i = 0; i < B.RESP.data.reading.length; i++) {
					read += '<li>' + B.RESP.data.reading[i].brRead + '</li>';
				}
			}

			$("#readUl").html(read);

			var  tid = _search.tid ? _search.tid : '';

			for (var i = 0; i < $(".logoDiv ul li a").length; i++) {
				$(".logoDiv ul li a")[i].href = "detail.html?type=" + (i + 1) + "?time_id=" + tid;
			}

			//航旅信息
			var fly = B.RESP.data.airTraval;
			if (typeof fly == "undefined") {
				$("#fly-title").css("display", "none");
				$("#fly-content").css("display", "none");
			} else {
				$("#fly-title").css("display", "block");
				$("#fly-content").css("display", "block");
				$(".fly_number").html(fly.totalNum);
				$(".second-class").html(fly.economyNum);
				$(".first-class").html(fly.businessNum);
			}

		}

		function getSearch() {
			var _href = window.location.search;
			if (_href.indexOf('?') != -1 && _href.indexOf('=') != -1) {
				var arr = _href.slice(1, _href.length);
				if(arr.indexOf('&') != -1){
					arr = arr.split('&');
				}else{
					arr = [arr];
				}
				var obj = {};
				$.each(arr, function(i, item) {
					obj[item.split('=')[0]] = item.split('=')[1];
				});
				return obj;
			} else {
				return '';
			}
		}
		B.init();

	})