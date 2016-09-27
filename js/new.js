define([
		'../init/api',
		'../plugins/zepto.min'
	],
	function(API) {
		var _DATA = [{
			pid: 1,
			name: '少儿险、教育险',
			degree: 1,
			iconurl: 'images/hx_baby.png'
		}, {
			pid: 2,
			name: '健康险、养老险',
			degree: 2,
			iconurl: 'images/hx_health.png'
		}, {
			pid: 3,
			name: '旅游险、意外险',
			degree: 2,
			iconurl: 'images/hx_sports.png'
		}, {
			pid: 4,
			name: '财产险、车险',
			degree: 0,
			iconurl: 'images/hx_carhome.png'
		}, {
			pid: 5,
			name: '女性险',
			degree: 0,
			iconurl: 'images/hx_dressing.png'
		}, {
			pid: 6,
			name: '理财',
			degree: 0,
			iconurl: 'images/hx_baoxian.png'
		}];

		var _search = getSearch();
		var time_id01 = _search.time_id ? _search.time_id : '407';
		var _pid = _search.pid ? _search.pid : '';
		var navUl_TML = _.template(['<div class="logoDiv">',
			'<ul class="clearfix">',
			'<% $.each(data, function(index, item){%>',
			"<%var text = (item.degree==1 ? '一般' : item.degree==2 ? '非买不可' : '不置可否');%>",
			'<li class="logoDiv_left logoDiv_left1 <%if(pid==item.pid){%> active_X <%}%>"><a data-pid="<%=item.pid%>" href="./detail.html?pid=<%=item.pid%><%="&time_id=' + time_id01 + '"%>"><span class="hx_cr btnos">',
			'<%=text%>',
			'</span><img src="<%=item.iconurl%>"><br><%=item.name%></a></li>', '<% }) %>', '</ul>', '</div>'
		].join(''));

		function Index(data) {
			if (!data) {
				$.ajax({
					url: API['findById.action'],
					type: "get",
					data: {
						time_id: time_id01
					},
					dataType: 'jsonp',
					success: function(data) {
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
			var arr = [];
			$.each(data, function(index, item) {
				$.each(_DATA, function(i, obj) {
					if (item.pid == obj.pid) {
						arr.push(_.extend(obj, item));
					}
				});
			});
			_DATA = arr;
			el.html(navUl_TML({
				pid: _pid,
				data: _DATA
			}));
			eventBind();
			if (!_pid) {
				$('.kongneirong').html('请选择保险种类');
			}
		}

		function eventBind() {
			var el = $('#navUl');
			var _li = el.find('li');
			if (_li.length == 0) {
				return
			}

			_li.on('click', 'a', function(event) {
				var $pid = $(this).attr('data-pid');
				if ($pid && $pid == _pid) {
					event.stopPropagation();
					event.preventDefault();
				}
			});
		}

		function getSearch() {
			var _href = window.location.search;
			if (_href.indexOf('?') != -1 && _href.indexOf('=') != -1) {
				var arr = _href.slice(1, _href.length);
				if (arr.indexOf('&') != -1) {
					arr = arr.split('&');
				} else {
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

		return Index
	});