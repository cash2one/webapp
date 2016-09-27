/*
* 对话框 组件
* author dezhao.chen
* */

define(['./tpl'], function (Tpl) {
    function Dialog() {
        this.init.apply(this, arguments);
    }

    _.extend(Dialog.prototype, {
        init: function (config) {
            this.config = {
                class: 'content_session',
                title: '',
                content: '提示框内容',
                confirm: '确认',
                cancel: '',
                display: false,
                onconfirm: function () {},
                oncancel: function () {}
            };
            _.extend(this.config, config);
            this.config.el = $('<div class="J_Dialog <%=class%>"></div>');
            this.bind();
        },

        bind: function () {
            this.render();
            this.events();
        },

        render: function () {
            this.config.el.html(Tpl(this.config));
            if($('body .content_session').length == 0){
                $('body').append(this.config.el);
            }
            this.config.display ? this.show() : this.hide();
        },

        events: function () {
            var self = this;
            this.config.el.on('tap', '.confirm', _.bind(this.close, this));
            this.config.el.on('tap', '.cancel', _.bind(this.close, this));

            this.config.el.on('tap', '.confirm', this.config.onconfirm);
            this.config.el.on('tap', '.cancel', this.config.oncancel);
        },

        set: function (config) {
            _.extend(this.config, config);
            this.render();
        },

        show: function () {
            this.config.el.show();
        },

        hide: function () {
            this.config.el.hide();
        },

        close: function () {
            this.config.el.remove();
        }
    });

    return Dialog;
});
