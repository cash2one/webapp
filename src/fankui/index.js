/*
 * 用户反馈
 * author: dezhao.chen
 * */
require([
    '../../init/api',
    '../dialog/index',
    '../../plugins/BrCordova'
], function (API, Dialog, BrCordova) {

    function getUserInfo() {
        this.init.apply(this, arguments);
    }

    _.extend(getUserInfo.prototype, {
        init: function () {
            this.contextEl = $('[name="context"]');
            this.contactEl = $('[name="contact"]');
            this.submitButton = $('.tijiao');
            this.eventBind();
            this.initDialog();
        },

        eventBind: function () {
            var self = this;
            this.submitButton.on('tap', _.bind(self.send, self));
        },

        send: function () {
            var self = this;
            $.ajax({
                url: API['feedback.action'],
                data: {
                    contact: self.contextEl.val(),
                    context: self.contactEl.val(),
                    flog: self.deviceInfo || ''
                },
                type: 'get',
                dataType: 'jsonp',
                async: true,
                success: _.bind(self.callback, self)
            })
        },

        callback: function (data) {
            if (data.code == 1) {
                this.success(data);
            } else {
                this.message(data);
            }
        },

        success: function (data) {
            //console.log('提交成功', data);
            this.dialog.set({
                display: true,
                cancel: '关闭',
                content: '<div class="warning"><img src="images/login_fail.png"></div>' +
                '<div class="text">' + '提交成功' + '</div>'
            });
        },

        message: function (data) {
            //console.error(data.code, data.message);
            this.dialog.set({
                display: true,
                cancel: '关闭',
                content: '<div class="warning"><img src="images/login_fail.png"></div>' +
                '<div class="text">' + data.message + '</div>'
            });
        },

        initDialog: function () {
            this.dialog = new Dialog();
        },

        getDeviceInfo: function () {
            var self = this;
            if (BrCordova) {
                BrCordova.getDeviceInfo(function (data) {
                    self.deviceInfo = data;
                });
            }
        }
    });

    new getUserInfo();
});