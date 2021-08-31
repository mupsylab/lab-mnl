// condition
// boundrary false
// order NP
// feedback true
// size 100



let info = {};
let trialInfo = {};

let boundrary = false, order = "NP";
let sti = [];
sti.push(jsPsych.randomization.factorial({
    feedback: [true],
    numSet: [5, 7, 10, 13, 15, 19, 25, 30, 35, 40, 43, 45, 50, 55, 61, 65, 70, 75, 80, 83, 85, 88, 90],
    unit: [1],
    size: [100]
}, repection).filter(function(e) { 
    return e.numSet > e.unit;
}));

function block(trial) {
    return {
        timeline: [{
            type: "html-keyboard-response",
            stimulus: "+",
            choices: jsPsych.NO_KEYS,
            trial_duration: 500
        }, trial, {
            type: "html-keyboard-response",
            stimulus: function () {
                if (jsPsych.timelineVariable("feedback", true)) {
                    let a = jsPsych.data.get().last(1).values();
                    console.log(a); // 调试用
                    return `您的估计准确率为<span style="color: red;">${Math.floor(a[0].acc * 100)}%`;
                } else {
                    return "";
                }
            },
            choices: jsPsych.ALL_KEYS,
            trial_duration: function () {
                if (jsPsych.timelineVariable("feedback", true)) {
                    return 1000;
                } else {
                    return false;
                }
            }
        }]
    }
}

// 正式开始的时候
sti.forEach(v => {
    timeline.push({
        type: "html-button-response",
        stimulus: function () {
            return `
            <p style="text-align: center;"><strong style="text-align: center;">欢迎你来参加我们的实验！</strong></p>
            <p>请你先坐好。</p>
            <p>这是一个数字判断任务，需要判断的是0-${v[0].size}之间的数字。实验中，首先你会看到一个注视点“+”，随后会在左上角出现一个需要判断的数字，数字下面有一条起点为0的射线（注意射线只有起点没有终点），请你根据射线左端以1为单元的线段长度判断这个数字在数字线上的位置，并用鼠标在数字线上标出该数字的位置，${v[0].feedback ? "我们会根据你的反应给予反馈，" : ""}随后会进入下一个需要判断的数字。数字呈现的时间很短，请你集中注意，又快又准的作出判断。
            </p>
            <p>这一部分是练习</p>`;
        },
        choices: ["继续"]
    }, {
        timeline: [{
            type: "html-button-response",
            stimulus: function () {
                if(!parseInt(sessionStorage.getItem("errorPrac"))) return "";
                return `
                <p style="text-align: center;"><strong style="text-align: center;">欢迎你来参加我们的实验！</strong></p>
                <p>请你先坐好。</p>
                <p>这是一个数字判断任务，需要判断的是0-${v[0].size}之间的数字。实验中，首先你会看到一个注视点“+”，随后会在左上角出现一个需要判断的数字，数字下面有一条起点为0的射线（注意射线只有起点没有终点），请你根据射线左端以1为单元的线段长度判断这个数字在数字线上的位置，并用鼠标在数字线上标出该数字的位置，${v[0].feedback ? "我们会根据你的反应给予反馈，" : ""}随后会进入下一个需要判断的数字。数字呈现的时间很短，请你集中注意，又快又准的作出判断。
                </p>
                <p>这一部分是练习</p>`;
                },
            choices: ["继续"],
            trial_duration: function() {
                if(parseInt(sessionStorage.getItem("errorPrac"))) { 
                    sessionStorage.setItem("errorPrac", "0");
                    return null;
                } else {
                    return false;
                }
            }
        }, block(trial3)],
        timeline_variables: jsPsych.utils.deepCopy(v).splice(0, pracNum),
        loop_function: function() { 
            let data = jsPsych.data.get().filter({save: true}).last(pracNum).select("acc").mean();
            if(data < 0.8) { 
                sessionStorage.setItem("errorPrac", "1");
                return true
            } else { 
                return false
            }
        }
    }, {
        type: "html-button-response",
        stimulus: function () {
            return `
            <p style="text-align: center;"><strong style="text-align: center;">欢迎你来参加我们的实验！</strong></p>
            <p>请你先坐好。</p>
            <p>这是一个数字判断任务，需要判断的是0-${v[0].size}之间的数字。实验中，首先你会看到一个注视点“+”，随后会在左上角出现一个需要判断的数字，数字下面有一条起点为0的射线（注意射线只有起点没有终点），请你根据射线左端以1为单元的线段长度判断这个数字在数字线上的位置，并用鼠标在数字线上标出该数字的位置，${v[0].feedback ? "我们会根据你的反应给予反馈，" : ""}随后会进入下一个需要判断的数字。数字呈现的时间很短，请你集中注意，又快又准的作出判断。
            </p>
            <p>这一部分是正式实验</p>`;
        },
        choices: ["继续"]
    }, {
        timeline: [block(trial3)],
        timeline_variables: v,
        randomize_order: true,
        repetitions: repection
    });
});
sti.forEach(v => {
    timeline.push({
        type: "html-button-response",
        stimulus: function () {
            return `
            <p style="text-align: center;"><strong style="text-align: center;">欢迎你来参加我们的实验！</strong></p>
            <p>请你先坐好。</p>
            <p>这是一个数字判断任务，需要判断的是0-${v[0].size}之间的数字。实验中，首先你会看到一个注视点“+”，随后会在左上角出现一个空白框，空白框下面有一条起点为0且带有蓝色标记的射线（注意射线只有起点没有终点）。请你判断蓝色标记所对应的数字，并将数字填写在左上角的空白框中，${v[0].feedback ? "我们会根据你的反应给予反馈，" : ""}随后会进入下一个需要判断的数字。数字呈现的时间很短，请你集中注意，又快又准的作出判断。
            </p>
            <p>这一部分是练习</p>`;
        },
        choices: ["继续"]
    }, {
        timeline: [{
            type: "html-button-response",
            stimulus: function () {
                if(!parseInt(sessionStorage.getItem("errorPrac"))) return "";
                return `
                <p style="text-align: center;"><strong style="text-align: center;">欢迎你来参加我们的实验！</strong></p>
                <p>请你先坐好。</p>
                <p>这是一个数字判断任务，需要判断的是0-${v[0].size}之间的数字。实验中，首先你会看到一个注视点“+”，随后会在左上角出现一个空白框，空白框下面有一条起点为0且带有蓝色标记的射线（注意射线只有起点没有终点）。请你判断蓝色标记所对应的数字，并将数字填写在左上角的空白框中，${v[0].feedback ? "我们会根据你的反应给予反馈，" : ""}随后会进入下一个需要判断的数字。数字呈现的时间很短，请你集中注意，又快又准的作出判断。
                </p>
                <p>这一部分是练习</p>`;
                },
            choices: ["继续"],
            trial_duration: function() {
                if(parseInt(sessionStorage.getItem("errorPrac"))) { 
                    sessionStorage.setItem("errorPrac", "0");
                    return null;
                } else {
                    return false;
                }
            }
        }, block(trial4)],
        timeline_variables: jsPsych.utils.deepCopy(v).splice(0, pracNum),
        loop_function: function() { 
            let data = jsPsych.data.get().filter({save: true}).last(pracNum).select("acc").mean();
            if(data < 0.8) { 
                sessionStorage.setItem("errorPrac", "1");
                return true
            } else { 
                return false
            }
        }
    }, {
        type: "html-button-response",
        stimulus: function () {
            return `
            <p style="text-align: center;"><strong style="text-align: center;">欢迎你来参加我们的实验！</strong></p>
            <p>请你先坐好。</p>
            <p>这是一个数字判断任务，需要判断的是0-${v[0].size}之间的数字。实验中，首先你会看到一个注视点“+”，随后会在左上角出现一个空白框，空白框下面有一条起点为0且带有蓝色标记的射线（注意射线只有起点没有终点）。请你判断蓝色标记所对应的数字，并将数字填写在左上角的空白框中，${v[0].feedback ? "我们会根据你的反应给予反馈，" : ""}随后会进入下一个需要判断的数字。数字呈现的时间很短，请你集中注意，又快又准的作出判断。
            </p>
            <p>这一部分是正式实验</p>`;
        },
        choices: ["继续"]
    }, {
        timeline: [block(trial4)],
        timeline_variables: v,
        randomize_order: true,
        repetitions: repection
    });
});