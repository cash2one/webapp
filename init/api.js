define(function () {
    //var URL="https://brokeraid.100credit.com/";     //测试
      var URL = "http://192.168.162.192:8080/minions/"; //108
//  var URL = "https://brotest.100credit.com/";

    return {
        'findById.action': URL + 'menu/findById.action',
        'showDetail.action': URL + 'demand/showDetail.action',
        /*
        * 用户反馈
        *   contact{string} 联系方式,手机或邮箱
        *   context{string} 反馈内容
        * 返回
        *   code{number} 状态码
        *       1: 成功,
        *       722: 服务器内部错误,
        *       718: 您的账号,
        *       15: session为空
        *   message{string} 返回信息
        * */
        'feedback.action': URL + 'more/feedback.action'
    }
});