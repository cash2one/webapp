function getByClass(sClass){
    var aResult=[];
    var aEle=document.getElementsByTagName('*');
   
    for(var i=0;i<aEle.length;i++){
        /*将每个className拆分*/
        var arr=aEle[i].className.split(/\s+/);
        for(var j=0;j<arr.length;j++){
            /*判断拆分后的数组中有没有满足的class*/
            if(arr[j]==sClass){
                aResult.push(aEle[i]);
            }
        }
    }
    return aResult;
};




window.onload=function(){
	
	//login页面一屏显示
	if(getByClass('header')[0] && getByClass('footer')[0] && getByClass('content')[0]){
		var hh= getByClass('header')[0].offsetHeight;
		
		
		var storage = window.localStorage; 
		
		if(storage.getItem("ch")!=null){
			
			var ch=storage.getItem("ch");
			
		}else{
			
			var ch=window.screen.height;
		
			if(window.innerHeight>window.screen.height){
				ch=window.innerHeight;
			}
			
			storage.setItem("ch",ch);
		}
		
		
		
		
		
		var fh=getByClass('footer')[0].offsetHeight;
		
		var cth=ch-hh-fh-120-130;
		
		
		getByClass('content')[0].style.height=(cth)+'px';
	}
	
	
	
	//密码框眼睛变色
	if(getByClass('eye')[0]){
		getByClass('eye')[0].onclick=function(){
			if(getByClass('upwd')[0].type=="password"){
				getByClass('upwd')[0].type="text";
				getByClass('eye')[0].style.backgroundPosition="0px -70px";
			}else{
				getByClass('upwd')[0].type="password";
					getByClass('eye')[0].style.backgroundPosition="0px -96px";
			}
				
		}
	}
	
	
	if(getByClass('eyePwd')[0]){
		getByClass('eyePwd')[0].onclick=function(){
			if(getByClass('rpwd')[0].type=="password"){
				getByClass('rpwd')[0].type="text";
				getByClass('eyePwd')[0].style.backgroundPosition="0px -70px";
			}else{
				getByClass('rpwd')[0].type="password";
					getByClass('eyePwd')[0].style.backgroundPosition="0px -96px";
			}
				
		}
	}
	
	
/* 	if(getByClass('back')[0] && getByClass('back')[0].getElementsByTagName('a')[0]){
		var lianjie=document.referrer;
		
		
		if(lianjie!=""){
			
			getByClass('back')[0].getElementsByTagName('a')[0].href=lianjie;
			if(getByClass('wenzi')[0].getElementsByTagName('span')[0].innerHTML=="忘记密码" && lianjie.indexOf('shezhi')!=-1){
				getByClass('wenzi')[0].getElementsByTagName('span')[0].innerHTML="修改密码"
			}
			if(getByClass('wenzi')[0].getElementsByTagName('span')[0].innerHTML=="修改密码" && lianjie.indexOf('login')!=-1){
				getByClass('wenzi')[0].getElementsByTagName('span')[0].innerHTML="忘记密码"
			}
			if(getByClass('wenzi')[0].getElementsByTagName('span')[0].innerHTML=="忘记密码" && lianjie.indexOf('xieyi')!=-1){
				getByClass('back')[0].getElementsByTagName('a')[0].href="login.html";
			}
			if(getByClass('wenzi')[0].getElementsByTagName('span')[0].innerHTML=="注册" && lianjie.indexOf('xieyi')!=-1){
				getByClass('back')[0].getElementsByTagName('a')[0].href="login.html";
			}
			
		}
		
	} */
	
	
	
	
	
	
	
}

