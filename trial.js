let trial11 = { // 给数字 猜位置 有界
    type: "survey-html-form",
    preamble: function() {
        return "<style>" + trialCss() + "</style>";
    },
    html: function() {
        // background 条状背景色
        // backgroundChoose 选择条状背景色
        return `
        <div class="tit">${jsPsych.timelineVariable("numSet", true)}</div>
        <div class="silder">
            <div id="background"></div>
            <div id="backgroundChoose"></div>
            <div id="start"></div>
            <div id="end"></div>
            <div id="move" distance="0"></div>
            <div class="label">
                <div id="startpoint"></div>
                <div id="endpoint"></div>
            </div>
        </div>`
    },
    button_label: ["继续"],
    on_load: function () {
        $("#startpoint").html("0");
        $("#endpoint").html(jsPsych.timelineVariable("size", true));
        // $("#move").attr("distance", "0")
        $("#jspsych-survey-html-form-next").css({
            visibility: "hidden"
        });

        res1();
        $(window).resize(function () { res1(); });
        $(document).on("click", mouse1);
        // PC
        $("#move").on("mousedown", mouse1);
        $(document).on("mouseup", mouse1);
        $(document).on("mousemove", mouse1);
        // Mobile
        $(document).on("touchstart", touch1);
        $(document).on("touchend", touch1);
        $(document).on("touchmove", touch1);

        $("#jspsych-survey-html-form-next").on("click", function (e) {
            $("#move").unbind("mousedown", mouse1);
            $(document).unbind("mouseup", mouse1);
            $(document).unbind("mousemove", mouse1);
            $(document).unbind("click", mouse1);
            $(document).unbind("touchstart", touch1);
            $(document).unbind("touchend", touch1);
            $(document).unbind("touchmove", touch1);
        });
    },
    on_finish: function (data) {
        data.feedback = jsPsych.timelineVariable("feedback", true); // 是否给予反馈
        data.size = jsPsych.timelineVariable("size", true); // 边界大小
        data.numSet = jsPsych.timelineVariable("numSet", true); // 所给的数字
        data.boundary = jsPsych.timelineVariable("boundary", true); // 是否有边界
        data.type = jsPsych.timelineVariable("type", true); // 给数字还是给位置

        data.corNum = data.numSet;
        data.respNum = (parseInt(sessionStorage.getItem("distance")) / maxSection) * parseInt(data.size);
        data.acc = 1 - (Math.abs(data.respNum - data.corNum)) / data.size;

        data.save = true;
        sessionStorage.setItem("distance", "0");
        $(window).resize(function () { });
    }
};

let trial12 = { // 给数字 猜位置 无界
    type: "survey-html-form",
    preamble: function() {
        return "<style>" + trialCss() + "</style>";
    },
    html: function() {
        // background 条状背景色
        // backgroundChoose 选择条状背景色
        return `
        <div class="tit">${jsPsych.timelineVariable("numSet", true)}</div>
        <div class="silder">
            <div id="background"></div>
            <div id="backgroundChoose"></div>
            <div id="start"></div>
            <div id="end"></div>
            <div id="move" distance="0"></div>
            <div class="label">
                <div id="startpoint"></div>
                <div id="endpoint"></div>
            </div>
        </div>`
    },
    button_label: ["继续"],
    on_load: function () {
        $("#startpoint").html("0");
        $("#endpoint").html(jsPsych.timelineVariable("size", true));
        $("#jspsych-survey-html-form-next").css({
            visibility: "hidden"
        });

        res2();
        $(window).resize(function () { res2(); });
        $(document).on("click", mouse2);
        // PC
        $("#move").on("mousedown", mouse2);
        $(document).on("mouseup", mouse2);
        $(document).on("mousemove", mouse2);
        // Mobile
        $(document).on("touchstart", touch2);
        $(document).on("touchend", touch2);
        $(document).on("touchmove", touch2);

        $("#jspsych-survey-html-form-next").on("click", function (e) {
            $("#move").unbind("mousedown", mouse2);
            $(document).unbind("mouseup", mouse2);
            $(document).unbind("mousemove", mouse2);
            $(document).unbind("click", mouse2);
            $(document).unbind("touchstart", touch2);
            $(document).unbind("touchend", touch2);
            $(document).unbind("touchmove", touch2);
        });
    },
    on_finish: function (data) {
        data.feedback = jsPsych.timelineVariable("feedback", true); // 是否给予反馈
        data.size = jsPsych.timelineVariable("size", true); // 一个单位所代表的长度
        data.numSet = jsPsych.timelineVariable("numSet", true); // 所给的数字
        data.boundary = jsPsych.timelineVariable("boundary", true); // 是否有边界
        data.type = jsPsych.timelineVariable("type", true); // 给数字还是给位置

        data.corNum = data.numSet;
        data.respNum = parseInt(parseFloat(sessionStorage.getItem("distance")) * parseFloat(data.size));
        data.acc = 1 - (Math.abs(data.respNum - data.corNum)) / (data.size * maxSection);

        data.save = true;
        sessionStorage.setItem("distance", "0");
        $(window).resize(function () { });
    }
};

let trial21 = { // 给位置 猜数字 有界
    type: "survey-html-form",
    preamble: function() {
        return "<style>" + trialCss() + "</style>";
    },
    html: function() {
        // background 条状背景色
        // backgroundChoose 选择条状背景色
        return `
        <div class="tit">
            <input type="number" name="guess" id="GuessNum" required \>
        </div>
        <div class="silder">
            <div id="background"></div>
            <div id="backgroundChoose"></div>
            <div id="start"></div>
            <div id="end"></div>
            <div id="move" distance="0"></div>
            <div class="label">
                <div id="startpoint"></div>
                <div id="endpoint"></div>
            </div>
        </div>`
    },
    button_label: ["继续"],
    on_load: function () {
        $("#startpoint").html("0");
        $("#endpoint").html(jsPsych.timelineVariable("size", true));
        // $("#move").attr("distance", "0")
        $("#move").attr(
            "distance",
            (jsPsych.timelineVariable("numSet", true) / jsPsych.timelineVariable("size", true)) * maxSection
        );
        res1();
        $(window).resize(function () { res1(); });
        $("#GuessNum").on("input", function(){
            sessionStorage.setItem("distance", $("#GuessNum").val());
            $("#jspsych-survey-html-form-next").css({
                visibility: "visible"
            });
        });
    },
    on_finish: function (data) {
        data.feedback = jsPsych.timelineVariable("feedback", true); // 是否给予反馈
        data.size = jsPsych.timelineVariable("size", true); // 边界大小
        data.numSet = jsPsych.timelineVariable("numSet", true); // 所给的数字
        data.boundary = jsPsych.timelineVariable("boundary", true); // 是否有边界
        data.type = jsPsych.timelineVariable("type", true); // 给数字还是给位置

        data.corNum = data.numSet;
        data.respNum = parseInt(sessionStorage.getItem("distance"));
        data.acc = 1 - (Math.abs(data.respNum - data.corNum)) / data.size;

        data.save = true;
        sessionStorage.setItem("distance", "0");
        $(window).resize(function () { });
    }
};

let trial22 = { // 给位置 猜数字 无界
    type: "survey-html-form",
    preamble: function() {
        return "<style>" + trialCss() + "</style>";
    },
    html: function() {
        // background 条状背景色
        // backgroundChoose 选择条状背景色
        return `
        <div class="tit">
            <input type="number" name="guess" id="GuessNum" required \>
        </div>
        <div class="silder">
            <div id="background"></div>
            <div id="backgroundChoose"></div>
            <div id="start"></div>
            <div id="end"></div>
            <div id="move" distance="0"></div>
            <div class="label">
                <div id="startpoint"></div>
                <div id="endpoint"></div>
            </div>
        </div>`
    },
    button_label: ["继续"],
    on_load: function () {
        $("#startpoint").html("0");
        $("#endpoint").html(jsPsych.timelineVariable("size", true));
        $("#jspsych-survey-html-form-next").css({
            visibility: "hidden"
        });

        $("#move").attr("distance", jsPsych.timelineVariable("numSet", true) / jsPsych.timelineVariable("size", true));
        res2();
        $(window).resize(function () { res2(); });
        $("#GuessNum").on("input", function(){
            sessionStorage.setItem("distance", $("#GuessNum").val());
            $("#jspsych-survey-html-form-next").css({
                visibility: "visible"
            });
        });
    },
    on_finish: function (data) {
        data.feedback = jsPsych.timelineVariable("feedback", true); // 是否给予反馈
        data.size = jsPsych.timelineVariable("size", true); // 一个单位所代表的长度
        data.numSet = jsPsych.timelineVariable("numSet", true); // 所给的数字
        data.boundary = jsPsych.timelineVariable("boundary", true); // 是否有边界
        data.type = jsPsych.timelineVariable("type", true); // 给数字还是给位置

        data.corNum = data.numSet;
        data.respNum = parseInt(sessionStorage.getItem("distance"));
        data.acc = 1 - (Math.abs(data.respNum - data.corNum)) / (data.size * maxSection);

        data.save = true;
        sessionStorage.setItem("distance", "0");
        $(window).resize(function () { });
    }
};

let instructions = {
    timeline: [{
        type: "html-button-response",
        stimulus: function() { 
            let isBoun = jsPsych.timelineVariable("boundary", true),
                isType = jsPsych.timelineVariable("type", true),
                isFeedback = jsPsych.timelineVariable("feedback", true),
                size = jsPsych.timelineVariable("size", true);

            let t1 = `这是一个数字判断任务，需要判断的是0-${size}之间的数字。实验中，首先你会看到一个注视点“+”，`,
                t2 = isType == "p" ? "随后会在左上角出现一个需要判断的数字，" : "随后会在左上角出现一个空白框，",
                t3 = (function() { 
                    if(isBoun) {
                        switch(isType) { 
                            case "n":
                                return `数字下面有一条线段，线段的起点为0，终点为${size}。请您判断这个数字在数字线上的位置，`
                                break;
                            case "p":
                                return `空白框下面有一条带有蓝色标记的线段，线段的起点为0，终点为${size}。请你判断蓝色标记所对应的数字，`
                                break;
                        }
                    } else {
                        switch(isType) { 
                            case "n":
                                return "数字下面有一条起点为0的射线（注意射线只有起点没有终点），请你根据射线左端以1为单元的线段长度判断这个数字在数字线上的位置，"
                                break;
                            case "p":
                                return "空白框下面有一条起点为0且带有蓝色标记的射线（注意射线只有起点没有终点）。请你判断蓝色标记所对应的数字，"
                                break;
                        }
                    }
                })(),
                t4 = isType == "p" ? "并用鼠标在数字线上标出该数字的位置，" : "并将数字填写在左上角的空白框中，",
                t5 = isFeedback ? "我们会根据你的反应给予反馈，" : "",
                t6 = "随后会进入下一个需要判断的数字。数字呈现的时间很短，请你集中注意，又快又准的作出判断。";

            return `
            <p style="text-align: center;"><strong style="text-align: center;">欢迎你来参加我们的实验！</strong></p>
            <style>p {
                text-align: left;
                text-indent: 2em;
            }</style>
            <p>请你先坐好。</p>
            <p>
                ${t1 + t2 + t3 + t4 + t5 + t6}
            </p>
            <p>这一部分是${parseInt(sessionStorage.getItem("isPrac")) ? "练习实验" : "正式实验"}</p>`
        },
        choices: ["继续"],
        on_finish: function() { 
            sessionStorage.setItem("showIns", "0");
        }
    }],
    conditional_function: function() { 
        if(parseInt(sessionStorage.getItem("showIns"))) { 
            return true;
        } else { 
            return false;
        }
    }
}

let feedback = {
    timeline: [{
        type: "html-keyboard-response",
        stimulus: function () {
            return `您的估计准确率为<span style="color: red;">${jsPsych.data.get().filter({save: true}).last(1).values()[0].acc * 100}%`;
        },
        choices: jsPsych.ALL_KEYS
    }],
    conditional_function: function() { 
        if(jsPsych.timelineVariable("feedback", true)) { 
            return true;
        } else { 
            return false;
        }
    }
}

let tot = {
    timeline: [{
        type: "html-keyboard-response",
        stimulus: "<span style='font-size:40px;'>+</span>",
        choices: jsPsych.NO_KEYS,
        trial_duration: 500
    }, {
        timeline: [trial11],
        conditional_function: function() { 
            if(jsPsych.timelineVariable("boundary", true) && jsPsych.timelineVariable("type", true) == "n") { 
                return true;
            } else { 
                return false;
            }
        }
    }, {
        timeline: [trial12],
        conditional_function: function() { 
            if(!jsPsych.timelineVariable("boundary", true) && jsPsych.timelineVariable("type", true) == "n") { 
                return true;
            } else { 
                return false;
            }
        }
    }, {
        timeline: [trial21],
        conditional_function: function() { 
            if(jsPsych.timelineVariable("boundary", true) && jsPsych.timelineVariable("type", true) == "p") { 
                return true;
            } else { 
                return false;
            }
        }
    }, {
        timeline: [trial22],
        conditional_function: function() { 
            if(!jsPsych.timelineVariable("boundary", true) && jsPsych.timelineVariable("type", true) == "p") { 
                return true;
            } else { 
                return false;
            }
        }
    }, feedback]
}