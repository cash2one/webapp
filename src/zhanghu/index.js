//var URL="https://brokeraid.100credit.com/";     //测试
var URL = "http://192.168.162.192:8080/minions/";    //108
//var URL = "https://brotest.100credit.com/";
var page = 1;//当前页
var rows = 8;//每页显示行数
var ind = 0;

function Zhanghu() {
    this.init.apply(this, arguments);
}

Zhanghu.prototype = {
    init: function () {
        this.ind = 0;
        //充值列表分页信息
        this.coinConfig = {page: 1, rows: 8};
        //积分列表分页信息
        this.freeConfig = {page: 1, rows: 8};
        this.events();
        //selectList(1);
        this.selectList(0);
        this.getUserInfo();
        this.initIscroll('wrapper', this.pullUpActionCoin);
        this.initIscroll('wrapper1', this.pullUpActionFree);
    },

    events: function () {
        var self = this;
        //确定--重新登录
        $(".finish_sure").click(function () {
            location.href = "login.html";
        });
        //722内部错误---取消
        $(".cancel_contact").click(function () {
            $(".bg").css("display", "none");
            $(".content_contact").css("display", "none");
        });

        $(".tab_menu li").click(function () {
            $(this).addClass('curr').siblings('li').removeClass('curr');
            self.ind = $(this).index();
            selectList(self.ind)
        });
    },

    getUserInfo: function () {
        var self = this;
        //我的账户/积分
        $.ajax({
            url: URL + "brAccount/findAccountBalance.action",
            type: "get",
            dataType: "jsonp",
            success: self.findAccountBalanceSuccess
        });
    },

    selectList: function (ind) {
        $(".tab_content>div").eq(ind).removeClass("content_hide").siblings().addClass("content_hide");
        if (ind == 0) {
            $(".wenzi span").text("账户");
            $(".zhulibi_helpinfo").text("账户消费明细");
            //查询账户列表
            this.getAccountData();
        } else if (ind == 1) {
            $(".wenzi span").text("积分");
            $(".zhulibi_helpinfo").text("积分明细");
            //获取积分列表数据
            this.getIntegralListData();
        }
    },

    //查询账户列表
    getAccountData: function () {
        var self = this;
        //查询账户列表成功
        $.ajax({
            url: URL + "brAccount/getAccountList.action",
            type: "get",
            data: self.coinConfig,
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                self.getAccountListSuccess.call(self, data)
            }
        });
    },

    //查询账户列表callback
    getAccountListSuccess: function (data) {
        var el = $('#thelist');
        var tpl = _.template(['<li class="zhanghu_list">',
            '<p><%=type%></p>',
            '<p><span class=""><%=create_time%></span>',
            '<span class="<%if(money<0){%> huafei_jian<%}else{%> huafei_add<%}%>">',
            '<%=money%>',
            '</span></p>',
            '</li>'].join(''));
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }

        $('#wrapper').css({"display": "block"});

        if (data.code == 741) {
            this.coinConfig.page += 1;
            this.coinConfig.rows += 8;

            var data_list = data.data.rows;
            debugger;
            $.each(data_list, function (index, item) {
                var li = $('<li class="zhanghu_list"></li>');
                li.html(tpl(item));
                el.append(li);
            });

            /*for (var i = 0; i < data_list.length; i++) {
             var l = document.createElement('li'); //创建一个li
             //var aaa = $(".zhanghu_list").clone().html();
             //l.innerHTML = aaa;
             l.className = "zhanghu_list";

             l.getElementsByTagName('p')[0].innerHTML = data_list[i].type;
             l.getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerHTML = data_list[i].create_time;
             if (data_list[i].money < 0) {
             l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML = data_list[i].money;
             l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className = "huafei_jian";
             } else {
             l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML = data_list[i].money;
             l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className = "huafei_add";
             }
             }*/
        } else if (data.code == 742) {
            console.log("查询账户列表失败")
        } else if (data.code == 715) {
            console.log("session为空,请重新登录");
            $(".bg").css("display", "block");
            $(".content_sessionNull").css("display", "block");
            localStorage.removeItem("uid");
            localStorage.removeItem("upwd");
            localStorage.removeItem("flag");
            localStorage.removeItem("sid");
            localStorage.removeItem("device_id");
        } else if (data.code == 718) {
            console.log("您的账号已在其他设备上登陆");
            $(".bg").css("display", "block");
            $(".content_other").css("display", "block");
            localStorage.removeItem("uid");
            localStorage.removeItem("upwd");
            localStorage.removeItem("flag");
            localStorage.removeItem("sid");
            localStorage.removeItem("device_id");
        } else if (data.code == 722) {
            console.log("内部错误");
            $(".bg").css("display", "block");
            $(".content_contact").css("display", "block");
        }
    },

    //获取积分列表数据
    getIntegralListData: function () {
        var self = this;
        $.ajax({
            url: URL + "brAccount/getIntegralList.action",
            type: "get",
            data: self.freeConfig,
            dataType: "jsonp",
            success: function (data) {
                self.getIntegralListSuccess.call(self, data)
            }
        });
    },
    //积分列表callback
    getIntegralListSuccess: function (data) {
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }
        $('#wrapper').css({"display": "none"});
        $('#wrapper1').css({"display": "block"});
        var el = document.getElementById('wrapper1');
        var eul = el.getElementsByTagName("ul")[0];
        console.log(eul.children.length + "--jifen thelist[i]", eul);
        if (data.code == 743) {
            this.freeConfig.page += 1;
            this.freeConfig.rows += 8;
            var data_list = data.data.rows;

            console.log(eul.children.length + "--jifen for thelist[i]", eul);

            for (var i = 0; i < data_list.length; i++) {
                var l = document.createElement('li');//创建一个li
                //var aaa = $("#jifenlist").clone().html();
                //l.innerHTML = aaa;
                l.className = "zhanghu_list";
                eul.appendChild(l);

                l.getElementsByTagName('p')[0].innerHTML = data_list[i].integral_type;
                l.getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerHTML = data_list[i].create_time;
                if (data_list[i].money < 0) {
                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML = data_list[i].integral;
                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className = "huafei_jian";
                } else {
                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerHTML = data_list[i].integral;
                    l.getElementsByTagName('p')[1].getElementsByTagName('span')[1].className = "huafei_add";
                }
            }

            console.log("zhanghu积分", document.getElementById('jifenthelist').children);
            //loaded1();
        } else if (data.code == 744) {
            console.log("查询积分列表失败")
        } else if (data.code == 715) {
            console.log("session为空,请重新登录");
            $(".bg").css("display", "block");
            $(".content_sessionNull").css("display", "block");
            localStorage.removeItem("uid");
            localStorage.removeItem("upwd");
            localStorage.removeItem("flag");
            localStorage.removeItem("sid");
            localStorage.removeItem("device_id");
        } else if (data.code == 718) {
            console.log("您的账号已在其他设备上登录");
            $(".bg").css("display", "block");
            $(".content_other").css("display", "block");
            localStorage.removeItem("uid");
            localStorage.removeItem("upwd");
            localStorage.removeItem("flag");
            localStorage.removeItem("sid");
            localStorage.removeItem("device_id");
        } else if (data.code == 722) {
            console.log("内部错误");
            $(".bg").css("display", "block");
            $(".content_contact").css("display", "block");
        }
    },

    findAccountBalanceSuccess: function (data) {
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }
        var money_zhulibi = $(".money_zhulibi");
        var money_jifen = $(".money_jifen");

        if (data.code == 739) {
            //console.log(data.data.balance);
            money_zhulibi.html(data.data.balance);
            if (money_zhulibi.html().length < 3) {
                money_zhulibi.css({"font-size": "72px", "line-height": "72px"});
            } else if (money_zhulibi.html().length == 3 || money_zhulibi.html().length == 4) {
                money_zhulibi.css({"font-size": "60px", "line-height": "60px"});
            } else if (money_zhulibi.html().length == 5) {
                money_zhulibi.css({"font-size": "48px", "line-height": "48px"});
            } else if (money_zhulibi.html().length > 5) {
                money_zhulibi.css({"font-size": "32px", "line-height": "32px"});
                money_zhulibi.html("十万以上");
            }
            money_jifen.html(data.data.integral);
            if (money_jifen.html().length < 3) {
                money_jifen.css({"font-size": "72px", "line-height": "72px"});
            } else if (money_jifen.html().length == 3 || money_jifen.html().length == 4) {
                money_jifen.css({"font-size": "60px", "line-height": "60px"});
            } else if (money_jifen.html().length == 5) {
                money_jifen.css({"font-size": "48px", "line-height": "48px"});
            } else if (money_jifen.html().length > 5) {
                money_jifen.css({"font-size": "32px", "line-height": "32px"});
                money_jifen.html("十万以上");
            }
        } else if (data.code == 740) {
            console.log("查询账户余额及积分余额失败");
        } else if (data.code == 715) {
            console.log("session为空,请重新登录");
            $(".bg").css("display", "block");
            $(".content_sessionNull").css("display", "block");
            localStorage.removeItem("uid");
            localStorage.removeItem("upwd");
            localStorage.removeItem("flag");
            localStorage.removeItem("sid");
            localStorage.removeItem("device_id");
        } else if (data.code == 718) {
            console.log("您的账号已在其他设备上登录");
            $(".bg").css("display", "block");
            $(".content_other").css("display", "block");
            localStorage.removeItem("uid");
            localStorage.removeItem("upwd");
            localStorage.removeItem("flag");
            localStorage.removeItem("sid");
            localStorage.removeItem("device_id");
        } else if (data.code == 722) {
            console.log("内部错误");
            $(".bg").css("display", "block");
            $(".content_contact").css("display", "block");
        }
    },

    initIscroll: function (id, pullUpAction) {
        var el = $('#' + id);
        var myScroll;
        var pullDownEl;
        var pullDownOffset;
        var pullUpEl = el.find('pullUp');
        var pullUpOffset;

        myScroll = new iScroll(id, {
            useTransition: true,
            topOffset: pullDownOffset,
            onRefresh: function () {
                if (pullUpEl.hasClass('loading')) {
                    pullUpEl.removeClass('loading');
                }
            },

            onScrollMove: function () {
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.hasClass('flip')) {
                    pullUpEl.addClass('flip');
                    //this.maxScrollY = this.maxScrollY; //??啥意思?
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.hasClass('flip')) {
                    pullUpEl.removeClass('flip');
                    this.maxScrollY = pullUpOffset;
                }
            },

            onScrollEnd: function () {
                if (pullUpEl.hasClass('flip')) {
                    pullUpEl.addClass('loading');
                    pullUpAction(el, myScroll);	// Execute custom function (ajax call?)
                }
            }
        });
        setTimeout(function () {
            document.getElementById('wrapper').style.left = '0';
            document.getElementById('wrapper1').style.left = '0';
        }, 800);
    },

    pullUpActionCoin: function (el, myScroll) {
        console.log('滚动加载 thelist');
        var thelist = el.find('ul');
        el.find('.content_zhulibi').css({"display": "block"});
        el.find('.content_jifen').css({"display": "none"});
        el.find(".wenzi span").text("账户");
        el.find(".zhulibi_helpinfo").text("账户消费明细");
        var pageNo;
        var pageSize = 8;
        thelist.find('.pullUp').show();
        pageNo = (thelist.find('li').size() - 1) / 8 + 1;
        if (parseInt(pageNo) != pageNo) {
            thelist.find('.pullUp').hid();
            return;
        }
        myScroll.refresh();
    },

    pullUpActionFree: function (el, myScroll) {
        console.log('滚动加载 jifenthelist');
        //myScroll.refresh();
    }
};

//run
Zepto(function ($) {
    new Zhanghu();
    //账户列表
    var params = {
        page: page,
        rows: rows
    };

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
});
