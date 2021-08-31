function res(unit = 0) {
    let a = $("#background"),
        b = $("#start"),
        c = $("#end"),
        d = $("#move"),
        e = $("#startpoint"),
        f = $("#endpoint"),
        m = $("#GuessNum"),
        n = $("#backgroundChoose");

    a.css({
        left: (function () {
            let aa = document.body.offsetWidth;
            if (aa > 1000) return (aa - 1000) / 2;
            return 20;
        }),
        top: (document.body.offsetHeight / 2) - 100
    });
    n.css({
        left: a.css("left"),
        top: a.css("top"),
        width: 0,
        height: a.outerHeight(),
        width: d.offset().left - b.offset().left
    });

    let BGtop = a[0].offsetTop + a[0].scrollHeight / 2,
        BGleft = a[0].offsetLeft;

    $(".tit").css({
        left: BGleft,
        top: BGtop - 200
    });
    $("#jspsych-survey-html-form-next").css({
        position: "absolute",
        top: BGtop + 150,
        left: BGleft
    });
    b.css({
        top: BGtop - b[0].clientHeight / 2,
        left: BGleft
    });
    c.css({
        top: BGtop - c[0].clientHeight / 2,
        left: BGleft + (unit ? (1200 / maxNum) : a.width())
    });
    e.css({
        top: BGtop + b.height(),
        left: BGleft - e.width() / 2,
        visibility: (unit ? "hidden" : "visible")
    });
    f.css({
        top: BGtop + c.height(),
        left: BGleft + (unit ? (1200 / (maxNum * 2)) : a.width()) - f.width() / 2
    });
    d.css({
        top: BGtop - d[0].clientHeight / 2,
        left: BGleft + parseInt(d.attr("distance"))
    });
    if (d[0].offsetLeft < BGleft) {
        d.css({
            left: BGleft
        });
    }
    if (m.length) {
        m.css({
            top: BGtop - m.height() - 100,
            left: BGleft,
            width: 100,
            height: 100,
            position: "absolute"
        });
    }

}

function mouse(e) {
    let d = $("#move");
    if (d.length) {
        d.attr("moving", (e.type === "mousedown") ? 1 : 0);
    }

    $("#jspsych-survey-html-form-next").css({
        visibility: "visible"
    });
}

function mousemove(e) {
    let a = $("#backgroundChoose"),
        b = $("#start"),
        c = $("#end"),
        d = $("#move"),
        f = $("#background");

    if (d.length && a.length && b.length && parseInt(d.attr("moving"))) {
        d.css({
            left: e.clientX < a[0].offsetLeft ? a[0].offsetLeft : ((boundrary && e.clientX > c.offset().left) ? c.offset().left : e.clientX)
        });
        let Svalue = ((d[0].offsetLeft - b[0].offsetLeft) * 100) / 1000;
        a.css({
            width: d.offset().left - b.offset().left
        });
        trialInfo["long"] = (Svalue / 100) * 1000;
        d.attr("distance", d[0].offsetLeft - b[0].offsetLeft);
    }
}

function touch(e) {
    let a = $("#backgroundChoose"),
        b = $("#start"),
        c = $("#end"),
        d = $("#move");
    if (!(a.length && b.length && c.length && d.length)) return 0;
    $("#jspsych-survey-html-form-next").css({
        visibility: "visible"
    });
    switch (e.type) {
        case "touchstart":
            if (Math.abs(a.offset().top - e.touches[0].clientY) < 100) { 
                d.attr("moving", 1);
            }
            break;
        case "touchmove":
            if(parseInt(d.attr("moving"))) { 
                d.css({
                    left: e.touches[0].clientX < a.offset().left ? a.offset().left : ((boundrary && e.touches[0].clientX > c.offset().left) ? c.offset().left : e.touches[0].clientX)
                });
                let Svalue = ((d[0].offsetLeft - b[0].offsetLeft) * 100) / 1000;
                a.css({
                    width: d.offset().left - b.offset().left
                });
                trialInfo["long"] = (Svalue / 100) * 1000;
                d.attr("distance", d[0].offsetLeft - b[0].offsetLeft);
            }
            break;
        case "touchend":
            d.attr("moving", 0)
            break;
    }
}

function click(e) {
    let a = $("#backgroundChoose"),
        b = $("#start"),
        c = $("#end"),
        d = $("#move");
    if (Math.abs(a.offset().top - e.originalEvent.clientY) < 100) {
        d.css({
            left: e.originalEvent.clientX < a[0].offsetLeft ? a[0].offsetLeft : ((boundrary && e.originalEvent.clientX > c.offset().left) ? c.offset().left : e.originalEvent.clientX)
        });
        let Svalue = ((d[0].offsetLeft - b[0].offsetLeft) * 100) / 1000;
        a.css({
            width: d.offset().left - b.offset().left
        });
        trialInfo["long"] = (Svalue / 100) * 1000;
        d.attr("distance", d[0].offsetLeft - b[0].offsetLeft);
    }
}