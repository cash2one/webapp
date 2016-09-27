

define(['./zepto.min'],function(){
	var B ={};
	
	B._http = function(URL,params){
		
		return  $.ajax({
	                url: URL,
	                type: "get",
	                data: params || "",
			        dataType : 'jsonp',
	                async: true
				})
	}
	B.getUrl = function(){
		return {
			/*detail : 'https://brokeraid.100credit.com/demand/showDetail.action',
			huaxiang : 'https://brokeraid.100credit.com/menu/findById.action'*/
			//detail : 'http://192.168.162.192:8080/minions/demand/showDetail.action',
			//huaxiang : 'http://192.168.162.192:8080/minions/menu/findById.action'
			detail :"https://brotest.100credit.com/demand/showDetail.action",
			huaxiang :"https://brotest.100credit.com/menu/findById.action"
		}
	}

	return B
})