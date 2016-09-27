define([], function () {
    var Tpl = [
        '<%if(title){%>',
            '<div class="title"><%=title%></div>',
        '<%}%>',
        '<div class="content"><%=content%></div>',
        '<div class="buttons">',
            '<%if(confirm){%>',
                '<button class="confirm finish_sure"><%=confirm%></button>',
            '<%}%>',
            '<%if(cancel){%>',
                '<button class="cancel"><%=cancel%></button>',
            '<%}%>',
        '</div>'
    ].join('');

    return _.template(Tpl);
});
