define(['./zepto.min'], function() {
	/*var URL = "https://brokeraid.100credit.com/";*/ //测试
	//	var URL = "http://192.168.162.192:8080/minions/"; //108
	var URL = "https://brotest.100credit.com/";
	var time_id01 = window.location.search.split("=")[1];

	function Index(data) {
		if (!data) {
			console.log(data);
			$.ajax({
				url: URL + "menu/findById.action",
				type: "get",
				data: {
					time_id: time_id01
				},
				dataType: 'jsonp',
				success: function(data) {
					console.log(data);
					if (data.data) {
						rendernavUl(data.data.profile);
					}
				}
			})
		} else {
			if (data.data) {
				rendernavUl(data.data.profile);
			}
		}
	}

	function rendernavUl(data) {
		var el = $('#navUl');
		$.each(data, function(index, item) {
			var text = '一般';
			if (this == 1) {
				text = '一般';
			} else if (this == 2) {
				text = '非买不可';
			} else if (this == 0) {
				text = '不置可否';
			}
			$('.btnos', el).eq(index - 1).html(text);
			$('.hx_cr', el).eq(index - 1).html(text);
		});
	}
	return Index
});