let trial1 = {
    type: "survey-html-form",
    preamble: function () {
        let num = jsPsych.timelineVariable("numSet", true);
        return '<div class="tit">' + num + '</div>'
    },
    html: `
    <div class="silder">
    <div id="background"></div>
    <div id="backgroundChoose"></div>
    <div id="start"></div>
    <div id="end"></div>
    <div id="move"></div>
    <div class="label">
        <div id="startpoint"></div>
        <div id="endpoint"></div>
    </div>
    </div>`,
    button_label: ["继续"],
    on_load: function () {
        $("#startpoint").html("0");
        $("#endpoint").html(jsPsych.timelineVariable("size", true));

        trialInfo["end"] = false;

        $("#move")[0].style.left = $("#background")[0].offsetLeft;
        $("#move").attr("distance", 0);
        $(".silder").css({
            width: "1200px"
        });
        res();
        $("#jspsych-survey-html-form-next").css({
            visibility: "hidden"
        });

        $(window).resize(function () { res(); });

        $("#move").on("mousedown", mouse);
        $(document).on("mouseup", mouse);
        $(document).on("mousemove", mousemove);
        // Mobile
        $(document).on("touchstart", touch);
        $(document).on("touchend", touch);
        $(document).on("touchmove", touch);
        $(document).on("click", click);
        $("#jspsych-survey-html-form-next").on("click", function (e) {
            trialInfo["end"] = true;
            $("#move").unbind("mousedown", mouse);
            $(document).unbind("mouseup", mouse);
            $(document).unbind("mousemove", mouse);
            $(document).unbind("click", click);
        });
    },
    on_finish: function (data) {
        data.realyNum = jsPsych.timelineVariable("numSet", true); // the show num
        data.size = jsPsych.timelineVariable("size", true); // the size
        data.feedback = jsPsych.timelineVariable("feedback", true) ? 1 : 0; // feedback
        data.order = order; // NP or PN
        data.boundrary = boundrary ? 1 : 0; // have boundrary?

        data.positionNum = trialInfo["long"] / (1000 / data.size); // choose the link

        data.acc = 1 - Math.abs(data.positionNum - data.realyNum) / data.size;
        data.save = true;

        $("#move").unbind("mousedown", mouse);
        $(document).unbind("mouseup", mouse);
        $(document).unbind("mousemove", mouse);
        trialInfo = {};
    }
};

let trial2 = {
    type: "survey-html-form",
    preamble: `
    <div class="silder">
    <div id="background"></div>
    <div id="backgroundChoose"></div>
    <div id="start"></div>
    <div id="end"></div>
    <div id="move"></div>
    <div class="label">
        <div id="startpoint"></div>
        <div id="endpoint"></div>
    </div>
    </div>`,
    html: `
    <div>
        <input type="number" name="guess" id="GuessNum" required \>
    </div>`,
    button_label: ["继续"],
    on_load: function () {
        $("#startpoint").html("0");
        $("#endpoint").html(jsPsych.timelineVariable("size", true));
        res();
        $(".silder").css({
            width: "1200px"
        });
        let a = jsPsych.timelineVariable("numSet", true) / jsPsych.timelineVariable("size", true);
        $("#move").css({
            left: a * $("#background").width() + $("#background").offset().left
        });
        $("#move").attr("distance", $("#move").offset().left - $("#start").offset().left);
        $("#backgroundChoose").css({
            width: $("#move").offset().left - $("#start").offset().left + $("#move").outerWidth() / 2
        });
        $(window).resize(function () { res(); });
    },
    on_finish: function (data) {
        data.guessNum = parseInt(data.response.guess); // guess for the link

        data.realyNum = jsPsych.timelineVariable("numSet", true); // the show num
        data.size = jsPsych.timelineVariable("size", true); // the size
        data.feedback = jsPsych.timelineVariable("feedback", true) ? 1 : 0; // feedback
        data.order = order; // NP or PN
        data.boundrary = boundrary ? 1 : 0; // have boundrary?

        data.acc = 1 - Math.abs(data.guessNum - data.realyNum) / data.size;
        data.save = true;

        trialInfo = {};
    }
};

let trial3 = {
    type: "survey-html-form",
    preamble: function () {
        let num = jsPsych.timelineVariable("numSet", true);
        return '<div class="tit">' + num + '</div>'
    },
    html: `
    <div class="silder">
    <div id="background"></div>
    <div id="backgroundChoose"></div>
    <div id="start"></div>
    <div id="end"></div>
    <div id="move"></div>
    <div class="label">
        <div id="startpoint"></div>
        <div id="endpoint"></div>
    </div>
    </div>`,
    button_label: ["继续"],
    on_load: function () {
        $("#background").css({
            width: 1200,
            background: "linear-gradient(to right, #ffffff, #000000 100%)"
        });
        $("#startpoint").html("0");
        $("#endpoint").html(jsPsych.timelineVariable("unit", true));

        trialInfo["end"] = false;

        $("#move")[0].style.left = $("#background")[0].offsetLeft;
        $("#move").attr("distance", 0);
        $(".silder").css({
            width: "1200px"
        });
        res(jsPsych.timelineVariable("unit", true));
        $("#jspsych-survey-html-form-next").css({
            visibility: "hidden"
        });

        $(window).resize(function () { res(jsPsych.timelineVariable("unit", true)); });

        $("#move").on("mousedown", mouse);
        $(document).on("mouseup", mouse);
        $(document).on("mousemove", mousemove);
        $(document).on("click", click);
        // Mobile
        $("#move").on("touchstart", touch);
        $(document).on("touchend", touch);
        $(document).on("touchmove", touch);
        $("#jspsych-survey-html-form-next").on("click", function (e) {
            trialInfo["end"] = true;
            $("#move").unbind("mousedown", mouse);
            $(document).unbind("mouseup", mouse);
            $(document).unbind("mousemove", mouse);
            $(document).unbind("click", click);
        });
    },
    on_finish: function (data) {
        data.realyNum = jsPsych.timelineVariable("numSet", true); // the show num
        data.size = jsPsych.timelineVariable("size", true); // the size
        data.unit = jsPsych.timelineVariable("unit", true); // the unit
        data.feedback = jsPsych.timelineVariable("feedback", true) ? 1 : 0; // feedback
        data.order = order; // NP or PN
        data.positionNum = (trialInfo["long"] / (1000 / maxNum)) * data.unit;// choose the link
        data.boundrary = boundrary ? 1 : 0; // have the boundrary?
        data.acc = 1 - Math.abs(data.positionNum - data.realyNum) / data.size;
        data.save = true;

        $("#move").unbind("mousedown", mouse);
        $(document).unbind("mouseup", mouse);
        $(document).unbind("mousemove", mouse);
        trialInfo = {};
    }
};

let trial4 = {
    type: "survey-html-form",
    preamble: `
    <div class="silder">
    <div id="background"></div>
    <div id="backgroundChoose"></div>
    <div id="start"></div>
    <div id="end"></div>
    <div id="move"></div>
    <div class="label">
        <div id="startpoint"></div>
        <div id="endpoint"></div>
    </div>
    </div>`,
    html: `
    <div>
        <input type="number" name="guess" id="GuessNum" required \>
    </div>`,
    button_label: ["继续"],
    on_load: function () {
        $("#background").css({
            width: 1200,
            background: "linear-gradient(to right, #ffffff, #000000 100%)"
        });
        $("#startpoint").html("0");
        $("#endpoint").html(jsPsych.timelineVariable("unit", true));
        res(jsPsych.timelineVariable("unit", true));
        $(".silder").css({
            width: "1200px"
        });
        let a = jsPsych.timelineVariable("numSet", true) / jsPsych.timelineVariable("unit", true);
        $("#move").css({
            left: a * (1000 / maxNum) + $("#background").offset().left
        });
        $("#backgroundChoose").css({
            width: $("#move").offset().left - $("#start").offset().left + $("#move").outerWidth() / 2
        });
        $("#move").attr("distance", $("#move").offset().left - $("#start").offset().left);
        $(window).resize(function () { res(jsPsych.timelineVariable("unit", true)); });
    },
    on_finish: function (data) {
        data.guessNum = parseInt(data.response.guess); // guess for the link

        data.realyNum = jsPsych.timelineVariable("numSet", true); // the show num
        data.size = jsPsych.timelineVariable("size", true); // the size
        data.unit = jsPsych.timelineVariable("unit", true); // the unit
        data.feedback = jsPsych.timelineVariable("feedback", true) ? 1 : 0; // feedback
        data.order = order; // NP or PN

        data.acc = 1 - Math.abs(data.guessNum - data.realyNum) / data.size;
        data.save = true;

        trialInfo = {};
    }
};