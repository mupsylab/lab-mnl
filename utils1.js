function res1() {
    // 有界
    let background = $("#background"),
        backgroundChoose = $("#backgroundChoose"),
        start = $("#start"),
        end = $("#end"),
        move = $("#move"),
        startpoint = $("#startpoint"),
        endpoint = $("#endpoint");
    
    start.css({
        top: (document.body.offsetHeight / 2) - $("#start").height() / 2,
        left: 70
    });

    end.css({
        top: (document.body.offsetHeight / 2) - $("#end").height() / 2,
        left: document.body.offsetWidth - 70
    });

    background.css({
        left: $("#start").position().left,
        top: $("#start").position().top - background.height() / 2 + $("#start").height() / 2,
        width: $("#end").position().left - $("#start").position().left,
        height: "3px",
        position: "absolute"
    });

    move.css({
        top: $("#start").position().top,
        left: $("#start").position().left + $("#background").width() * (parseInt($("#move").attr("distance")) / maxSection)
    });

    backgroundChoose.css({
        left: $("#background").position().left,
        top: $("#background").position().top,
        width: $("#move").position().left - $("#start").position().left
    });

    startpoint.css({
        position: "absolute",
        top: $("#start").position().top + $("#startpoint").height() / 2 + 50,
        left: $("#start").position().left - $("#startpoint").width() / 2
    });

    startpoint.css({
        position: "absolute",
        top: $("#start").position().top + $("#startpoint").height() / 2 + 50,
        left: $("#start").position().left - $("#startpoint").width() / 2
    });

    endpoint.css({
        position: "absolute",
        top: $("#end").position().top + $("#endpoint").height() / 2 + 50,
        left: $("#end").position().left - $("#endpoint").width() / 2
    });

    $(".tit").css({
        left: $("#start").position().left,
        top: $("#start").position().top - $("#start").height() - $(".tit").height()
    });

    $("#jspsych-survey-html-form-next").css({
        position: "absolute",
        visibility: "hidden",
        left: $("#start").position().left,
        top: $("#startpoint").position().top + 100
    });
}

function moveChange1(x) {
    if(x < $("#start").position().left || x > $("#end").position().left) return 0;
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
        ((x - $("#start").position().left) / $("#background").width()) * maxSection
    );
    sessionStorage.setItem("distance", $("#move").attr("distance"));
    $("#jspsych-survey-html-form-next").css({
        visibility: "visible"
    });
}

function touch1(e) { 
    switch(e.type) { 
        case "touchstart":
            $("#move").attr("moving", 1);
            break;
        case "touchend":
            $("#move").attr("moving", 0);
            break;
        case "touchmove":
            if(parseInt($("#move").attr("moving")))moveChange1(e.touches[0].clientX);
            break;
    }

}

function mouse1(e) {
    switch(e.type) {
        case "mousemove":
            if(parseInt($("#move").attr("moving")))moveChange1(e.originalEvent.clientX);
            break;
        case "click":
            if(Math.abs($("#background").position().top + ($("#background").height() / 2) - e.originalEvent.clientY) < 100)
            moveChange1(e.originalEvent.clientX);
            break;
        default:
            $("#move").attr("moving", (e.type === "mousedown") ? 1 : 0);
            break;
    }
}