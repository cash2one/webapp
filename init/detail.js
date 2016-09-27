//init
require([
	'../init/api',
	'../js/globalService', 
	'../js/new', 
	'../js/zepto.min'], 
	function(API, gService, NavUI) {
	var B = {},
		doc = document;

	function getByClass(sClass) {
		var aResult = [];
		var aEle = document.getElementsByTagName('*');

		for (var i = 0; i < aEle.length; i++) {
			/*将每个className拆分*/
			var arr = aEle[i].className.split(/\s+/);
			for (var j = 0; j < arr.length; j++) {
				/*判断拆分后的数组中有没有满足的class*/
				if (arr[j] == sClass) {
					aResult.push(aEle[i]);
				}
			}
		}
		return aResult;
	};
	B.RESP = {};

	var lc = window.location.href;
	var _type = 1;
	if (lc.indexOf('?') != -1) {
		_type = parseInt(lc.split("=")[1]);
		if (_type == 5) {
			$(".fly").css("display", "block");
			$(".normal").css("display", "none");
		} else {
			$(".fly").css("display", "none");
			$(".normal").css("display", "block");
		}
	}

	B.post = {
		select_type: _type
	};

	B.init = function() {
		B.bindEvt();
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
	};
	B.getData = function() {
	$.ajax({
			
			url: API['showDetail.action'],
			type: "get",
			data: B.post,
			dataType: 'jsonp',
			async: true,
			success: function(data) {
				console.log(data);
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
		});
	};
	B.addHtml = function() {
		var brd = buy = read = con = "";

		if (B.RESP.data.brands) {
			for (var i = 0; i < B.RESP.data.brands.length; i++) {
				brd += '<li class="brdLi"><span>' + B.RESP.data.brands[i].brBrand + '</span></li>'

			}
		} else {
			brd += '<p class="kongneirong">还没有收集到记录,百融君正在努力。</p>'
		}

		if (B.RESP.data.payOut) {
			for (var i = 0; i < B.RESP.data.payOut.length; i++) {
				buy += '<li class="brdLi"><span>' + B.RESP.data.payOut[i].payOutName + '</span></li>'

			}
		} else {
			buy += '<p class="kongneirong">还没有收集到记录,百融君正在努力。</p>'
		}

		if (B.RESP.data.reading) {
			for (var i = 0; i < B.RESP.data.reading.length; i++) {
				read += '<li class="brdLi"><span>' + B.RESP.data.reading[i].brRead + '</span></li>'

			}
		} else {
			read += '<p class="kongneirong">还没有收集到记录,百融君正在努力。</p>'
		}

		$("#brdUl").html(brd);
		$("#buyUl").html(buy);
		$("#readUl").html(read);

		if (typeof B.RESP.data.tag !== "undefined") {
			$("#payNum").html(B.RESP.data.tag[0].scanNum);
			$("#paySort").html(B.RESP.data.tag[0].payNum);
			if (typeof B.RESP.data.tag[0] == "object") {
				if (B.RESP.data.tag[0].paySort == 0) {
					$("#top-list").css("display", "none");
				} else {
					$("#top-list").css("display", "block");
				}
			} else {
				$("#top-list").css("display", "none");
			}
			$("#scanNum").html(B.RESP.data.tag[0].paySort);
		} else {
			$("#payNum").html("0");
			$("#paySort").html("0");
			$("#scanNum").html("0");
			$("#top-list").css("display", "none");
		}

		//if(B.RESP.data.tag!=undefined){
		//
		//	if(B.RESP.data.tag[0].abroad!=undefined){
		//		$(".details3").css("display","none");
		//
		//		$("#payNum").html(" ");
		//		$("#paySort").html(" ");
		//		$("#scanNum").html(" ");
		//
		//		$("#abroad").html(B.RESP.data.tag[0].abroad);
		//		$("#home").html(B.RESP.data.tag[0].home);
		//
		//		$(".details3").css("display","block");
		//	}else{
		//		$(".details3").css("display","none");
		//
		//		$("#payNum").html(B.RESP.data.tag[0].scanNum);
		//		$("#paySort").html(B.RESP.data.tag[0].payNum);
		//		if(B.RESP.data.tag[0].paySort==0){
		//			$("#top-list").css("display","none");
		//		}else{
		//			$("#top-list").css("display","block");
		//		}
		//		$("#scanNum").html(B.RESP.data.tag[0].paySort);
		//
		//		$(".details3").css("display","block");
		//	}
		//}else{
		//	if($(".normal").css("display")=="block"){
		//		$(".details3").css("display","none");
		//
		//		$("#payNum").html("0");
		//		$("#paySort").html("0");
		//		$("#scanNum").html("0");
		//
		//		$(".details3").css("display","block");
		//	}else{
		//		$(".details3").css("display","none");
		//
		//		$("#payNum").html("&nbsp;");
		//		$("#paySort").html("&nbsp;");
		//		$("#scanNum").html("&nbsp;");
		//
		//		$("#abroad").html("0");
		//		$("#home").html("0");
		//
		//		$(".details3").css("display","block");
		//	}
		//
		//}

	}
	B.bindEvt = function() {

		$("#navUl li").on('click', function() {
			var i = $(this).index(),
				$this = $(this),
				$active = $(".active_X");

			if ($this.hasClass("normal_X")) {
				//$(".active_X").find("img").eq(0).css("display","none");
				//$(".active_X").find("img").eq(1).css("display","block");
				$(".active_X").find(".normal_X2").removeClass("active_X2");
				$(".active_X").addClass("normal_X");
				$(".active_X").removeClass("active_X");

				//$this.find("img").eq(0).css("display","block");
				//$this.find("img").eq(1).css("display","none");
				$this.find(".normal_X2").addClass("active_X2");
				$this.addClass("active_X");
				$this.removeClass("normal_X");

				//$this.find(".normal_X2").removeClass("normal_X2");

				B.post.select_type = i + 1;

				//if(B.post.select_type==5){
				//	$(".fly").css("display","block");
				//	$(".normal").css("display","none");
				//}else{
				//	$(".fly").css("display","none");
				//	$(".normal").css("display","block");
				//}

				B.getData(B.post);
			}
		});
	}

	B.init()

	return B;
});