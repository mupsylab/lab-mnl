document.title = "mental number line";
let pracNum = 4;
let repection = 3;
let timeline = [];
var maxNum = 90;
let subjectID = "Mu02"
// 禁止手机页面拖动
$("html,body").css("overflow","hidden").css("height","100%");
document.body.addEventListener('touchmove', self.welcomeShowedListener, false);

// timeline.push({
//     // 进入全屏
//     type: 'fullscreen',
//     fullscreen_mode: true,
//     message: "<p style='font: bold 42px 微软雅黑; color: #B22222'>\
//                    欢迎参与我们的实验</p>\
//                    <p style='font: 30px 微软雅黑; color: black'><br/>\
//                    <单击下方 我同意 进入实验程序><br/><b>实验过程中请勿退出全屏</b>\
//                    <br/><br/></p>\
//                    <p style='font: 24px 华文中宋; color: grey'>\
//                    Mupsy在线实验室<br/>2021年</p>",
//     button_label: "我同意",
// }, {
//     type: "instructions",
//     pages: ["指导语"],
//     show_clickable_nav: true,
//     allow_backward: true,
//     button_label_previous: "返回",
//     button_label_next: "继续"
// }, info_get(subjectID));

load.js([
    "trial.js",
    "css.js",
    "exp" + (parseInt(jsPsych.data.urlVariables().type) ? parseInt(jsPsych.data.urlVariables().type) : 1) + ".js",
    "utils.js"
]);
mupsyStart({
    timeline: timeline,
    on_finish: function () {
        return {
            id: info["index"] + "_" + (parseInt(jsPsych.data.urlVariables().type) ? parseInt(jsPsych.data.urlVariables().type) : 1)
        }
    }
});