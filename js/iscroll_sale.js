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
            /10+1;

        if(parseInt(pageNo)!=pageNo){
            document.getElementById('pullUp').style.display="none";
            return;
        }

        var pageSize=8;

        var url=decodeURI(window.location.href);
        //console.log('url',url);
        function urlToJson(url){
            if(!(/\?/g.test(url))) return {};
            var obj = {};
            var str=url.split("?");
            var str01=str[1].split("&");
            for (var i=0;i<str01.length;i++){
                var temp = str01[i].split('=');
                obj[temp[0]] =  temp[1];
            }
            return obj
        }
        var canshu=urlToJson(url);
        if(canshu.insurance_type){
            var area1=canshu.area;
            var city1=canshu.city;
            var insurance_type1=canshu.insurance_type;
            var province1=canshu.province;
            var params={
                area:area1,
                city:city1,
                insurance_type:insurance_type1,
                province:province1,
                currentPage:pageNo,
                pageSize:pageSize
            };
            $.ajax({
                url:URL+"saleCule/getList.action",
                type:"get",
                data:params,
                dataType:'jsonp',
                success:function(data){
                    if(typeof data == 'string'){
                        var data = JSON.parse(data);
                    }
                    if(data.code==1){
                        var data_list=data.data.brSaleClueList;
                        //console.log(data_list)
                        for(var i=0;i<data_list.length;i++){
                            var l=document.createElement('li');//创建一个li
                            var content=$(".info_list").html();
                            l.innerHTML=content;
                            l.setAttribute("data-id",data_list[i].id);
                            data_list[i].insurance_type = JSON.parse(data_list[i].insurance_type);
                            //l.onclick=function(){
                            //    var id=$(this).attr("data-id");
                            //    window.location.href=encodeURI("xiansuoInfo.html?city="+city
                            //    +"&insurance_type="+insurance_type
                            //    +"&province="+province
                            //    +"&id="+id
                            //    +"&last_browse_time="+last_browse_time
                            //    +"&name="+name
                            //    +"&browse_count="+browse_count);
                            //};
                            var stringObj=JSON.stringify(data_list[i]);
                            l.onclick = new Function("pass_para_popup_link('" + stringObj + "');");
                            $('#thelist').append(l);
                            //document.getElementById("thelist").getElementsByTagName("li")[0].getElementsByTagName('div')[5]
                            l.getElementsByTagName('div')[2].innerHTML=data_list[i].name;
                            l.getElementsByTagName('div')[5].innerHTML=data_list[i].last_browse_time;
                            //var jsonobj=JSON.parse(data_list[i].insurance_type);
                            var jsonobj=data_list[i].insurance_type;
                            //console.log('jsonobj',jsonobj,i)
                            var j = 0;
                            for(var key in jsonobj){
                                if(j >= 3){
                                    break;
                                }
                                $(l).find('.baoxian_show').append('<li>' + key + '</li>');
                                j++;
                            }
                        }
                    }
                }
            })
        }else{
            var area2=$(".area").html();
            var city2=$(".city").html();
            var province2=$(".province").html();
            console.log(province2)
            var str_baoxian=document.getElementsByClassName('guanzhu_baoxian')[0].getElementsByTagName('li');
            var arr_baoxian=[];
            for(var z=0;z<str_baoxian.length;z++){
                arr_baoxian.push(str_baoxian[z].innerHTML);
            }
            var insurance_type2=arr_baoxian.join();
            var params={
                area:area2,
                city:city2,
                insurance_type:insurance_type2,
                province:province2,
                currentPage:pageNo,
                pageSize:pageSize
            };
            $.ajax({
                url:URL+"saleCule/getList.action",
                type:"get",
                data:params,
                dataType:'jsonp',
                success:function(data){
                    if(typeof data == 'string'){
                        var data = JSON.parse(data);
                    }
                    if(data.code==1){
                        var data_list=data.data.brSaleClueList;
                        for(var i=0;i<data_list.length;i++){
                            var l=document.createElement('li');//创建一个li
                            var content=$(".info_list").html();
                            l.innerHTML=content;
                            l.setAttribute("data-id",data_list[i].id);
                            $('#thelist').append(l);
                            l.getElementsByTagName('div')[2].innerHTML=data_list[i].name;
                            l.getElementsByTagName('div')[5].innerHTML=data_list[i].last_browse_time;
                            var jsonobj=data_list[i].insurance_type;
                            var j = 0;
                            for(var key in jsonobj){
                                if(j >= 3){
                                    break;
                                }
                                $(l).find('.baoxian_show').append('<li>' + key + '</li>');
                                j++;
                            }
                        }
                    }
                }
            })
        }
    }, 20);	// <-- Simulate network congestion, remove setTimeout from production!
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 100); }, false);