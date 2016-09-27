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

        var rows=8;
        var params={
            page:pageNo,
            rows:rows
        };
        $.ajax({
            url:URL+"brAccount/getAccountList.action",
            type:"get",
            data: params,
            dataType:"jsonp",
            success:function(data){
                if(typeof data == 'string'){
                    var data = JSON.parse(data);
                }
                if(data.code == 741){
                    var data_list=data.data.rows;
                    for(var i=0;i<data_list.length;i++){
                        var l=document.createElement('li');//创建一个li
                        var aaa=$(".zhanghu_list").html();
                        l.innerHTML=aaa;
                        l.className="zhanghu_list";
                        $('.zhanghu_info').append(l);
                        l.getElementsByTagName('p')[0].innerHTML=data_list[i].account_integral_id;
                        l.getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerHTML=data_list[i].create_time;
                        if(data_list[i].money<0){
                            l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].money;
                            l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_jian";
                        }else{
                            l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML=data_list[i].money;
                            l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className="huafei_add";
                        }
                    }
                }else if(data.code==742){
                    alert("查询账户列表失败")
                }
            }
        });
    }, 20);	// <-- Simulate network congestion, remove setTimeout from production!
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 100); }, false);