// ?boundary=false&type=pn&size=100&numSet=[5,7,10,13,15,19,25,30,35,40,43,45,50,55,61,65,70,75,80,83,85,88,90,95,97]&feedback=true&repection=3
// ?boundary=true&type=pn&size=10&numSet=[5,7]&feedback=false&repection=3&length=100

// 初始化检测
let c = Object.keys((function() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})());
if(c.length < 6) $("body").html("参数错误，请询问实验人员");

document.title = "mental number line";

let info = {};
let timeline = [];
let subjectID = "Mu02";

let pracNum = 2, pracAcc = 0.8;

let maxSection = parseInt(jsPsych.data.getURLVariable("length")) ? parseInt(jsPsych.data.getURLVariable("length")) : 100; // 这是显示出来的最大值，指的是将屏幕宽度切分为100份

// 禁止手机页面拖动
$("html,body").css("overflow","hidden").css("height","100%");
document.body.addEventListener('touchmove', self.welcomeShowedListener, false);

let conf = {
    feedback: [JSON.parse(jsPsych.data.getURLVariable("feedback"))],
    numSet: JSON.parse(jsPsych.data.getURLVariable("numSet")),
    size: [JSON.parse(jsPsych.data.getURLVariable("size"))],
    boundary: [JSON.parse(jsPsych.data.getURLVariable("boundary"))],
    type: jsPsych.data.getURLVariable("type")
};

let sti = [];
sti.push(
    jsPsych.randomization.factorial(
        Object.assign({}, conf, { type: [conf["type"].slice(0, 1)]}
    )),
    jsPsych.randomization.factorial(
        Object.assign({}, conf, { type: [conf["type"].slice(1, 2)]}
    ))
);

timeline.push({
    // 进入全屏
    type: 'fullscreen',
    fullscreen_mode: true,
    message: "<p style='font: bold 42px 微软雅黑; color: #B22222'>\
                   欢迎参与我们的实验</p>\
                   <p style='font: 30px 微软雅黑; color: black'><br/>\
                   <单击下方 我同意 进入实验程序><br/><b>实验过程中请勿退出全屏</b>\
                   <br/><br/></p>\
                   <p style='font: 24px 华文中宋; color: grey'>\
                   Mupsy在线实验室<br/>2021年</p>",
    button_label: "我同意",
}, info_get(subjectID));

load.js([
    "trial.js",
    "css.js",
    "utils1.js",
    "utils2.js"
]);

sti.forEach(v => {
    timeline.push({
        type: "call-function",
        func: function() { 
            sessionStorage.setItem("showIns", "1");
            sessionStorage.setItem("isPrac", "1");
        }
    }, {
        timeline: [{
            timeline: [instructions, tot],
            timeline_variables: v,
            sample: {
                type: "without-replacement",
                size: pracNum
            },
            randomize_order: true
        }],
        loop_function: function() { 
            let a = jsPsych.data.get().filter({save: true}).last(pracNum).select("acc").mean();
            if(a < pracAcc) {
                sessionStorage.setItem("showIns", "1");
                sessionStorage.setItem("pracError", "1");
                return true;
            } else { 
                sessionStorage.setItem("showIns", "0");
                sessionStorage.setItem("pracError", "0");
                return false;
            }
        }
    });
    timeline.push({
        type: "call-function",
        func: function() { 
            sessionStorage.setItem("showIns", "1");
            sessionStorage.setItem("isPrac", "0");
        }
    }, {
        timeline: [instructions, tot],
        timeline_variables: v,
        repetitions: parseInt(jsPsych.data.getURLVariable("repection")),
        randomize_order: true,
        on_finish: function() { 
            sessionStorage.setItem("isPrac", "1");
        }
    });
});


mupsyStart({
    timeline: timeline,
    on_finish: function () {
        mupsyEnd({
            save: true,
            data: jsPsych.data.get().filter({save: true}).addToAll(info)
        });
    }
});