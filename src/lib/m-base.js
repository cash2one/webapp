/**
 * Created by dezhao.chen on 16/4/21.
 */
var c = window.screen.width;
if (c != 720) {
    if (c > 720) {
        var prt = 0.5;
    } else {
        var prt = c / 720;
    }
} else {
    var prt = 0.5;
}
document.write('<meta name="viewport" content="width=device-width, initial-scale=' + prt + ', maximum-scale=' + prt + ', minimum-scale=' + prt + '" />');