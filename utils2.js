function res2() {
    // 无界
    let background = $("#background"),
        backgroundChoose = $("#backgroundChoose"),
        start = $("#start"),
        end = $("#end"),
        move = $("#move"),
        startpoint = $("#startpoint"),
        endpoint = $("#endpoint");
    
    start.css({
        top: (document.body.offsetHeight / 2) - $("#start").height() / 2,
        left: 70 // 后面可以视情况修改
    });

    end.css({
        top: (document.body.offsetHeight / 2) - $("#end").height() / 2,
        left: $("#start").position().left + (document.body.offsetWidth - 140) / maxSection // 后面可以视情况修改
    });

    background.css({
        left: $("#start").position().left,
        top: $("#start").position().top - background.height() / 2 + $("#start").height() / 2,
        width: $("#end").position().left - $("#start").position().left, // 后面可以视情况修改
        height: "3px",
        position: "absolute",
        background: "white"
    });

    move.css({
        top: $("#start").position().top,
        left: $("#start").position().left + ($("#end").position().left - $("#start").position().left) * parseFloat($("#move").attr("distance"))
    });

    backgroundChoose.css({
        left: $("#background").position().left,
        top: $("#background").position().top,
        width: $("#move").position().left - $("#start").position().left,
        backgroundImage: "linear-gradient(to right, white 0%, white 50%, transparent 50%)",
        backgroundSize: "10px 1px",
        backgroundRepeat: "x-repeat"
    });

    startpoint.css({
        visibility: "hidden"
    });
    
    endpoint.css({
        position: "absolute",
        top: $("#end").position().top + $("#endpoint").height() / 2 + 50,
        left: $("#start").position().left + ($("#end").position().left - $("#start").position().left) / 2 - $("#endpoint").width() / 2
    });

    endpoint.css({
        position: "absolute",
        top: $("#end").position().top + $("#endpoint").height() / 2 + 50,
        left: $("#start").position().left + ($("#end").position().left - $("#start").position().left) / 2 - $("#endpoint").width() / 2
    });

    $(".tit").css({
        left: $("#start").position().left,
        top: $("#start").position().top - $("#start").height() - $(".tit").height()
    });

    $("#jspsych-survey-html-form-next").css({
        position: "absolute",
        visibility: "hidden",
        left: $("#start").position().left,
        top: $("#endpoint").position().top + 100
    });

    $("#jspsych-html-button-response-btngroup").css({
        position: "absolute",
        left: $("#start").position().left,
        top: $("#endpoint").position().top + 100
    });
}


function moveChange2(x) {
    if(x < $("#start").position().left) return 0;
    $("#move").css({
        left: x
    });
    $("#backgroundChoose").css({
        left: $("#background").position().left,
        top: $("#background").position().top,
        width: $("#move").position().left - $("#start").position().left
    });
    $("#move").attr(
        "distance",
        ((x - $("#start").position().left) / ($("#end").position().left - $("#start").position().left))
    );
    sessionStorage.setItem("distance", $("#move").attr("distance"));
    $("#jspsych-survey-html-form-next").css({
        visibility: "visible"
    });
}

function touch2(e) { 
    switch(e.type) { 
        case "touchstart":
            $("#move").attr("moving", 1);
            break;
        case "touchend":
            $("#move").attr("moving", 0);
            break;
        case "touchmove":
            if(parseInt($("#move").attr("moving")))moveChange2(e.touches[0].clientX);
            break;
    }

}

function mouse2(e) {
    switch(e.type) {
        case "mousemove":
            if(parseInt($("#move").attr("moving")))moveChange2(e.originalEvent.clientX);
            break;
        case "click":
            if(Math.abs($("#background").position().top + ($("#background").height() / 2) - e.originalEvent.clientY) < 100)
            moveChange2(e.originalEvent.clientX);
            break;
        default:
            $("#move").attr("moving", (e.type === "mousedown") ? 1 : 0);
            break;
    }
}