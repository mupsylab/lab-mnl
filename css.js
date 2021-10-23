function trialCss() {
    return `
    .tit {
        text-align: left;
        font-size: 50px;
        position: absolute;
        user-select: none;
    }

    .label {
        font-size: 30px;
        user-select: none;
    }

    .silder #background {
        background: -webkit-linear-gradient(rgb(0, 0, 255), #ddd) no-repeat, #ddd;
        background-size: 0% 100%;
        width: 1000px;
        /* background: rgb(255,255,255); */
        height: 3px;
        position: absolute;
        left: 10%;
        top: 40%;
    }
    .silder #backgroundChoose { 
        background: rgb(0, 0, 255);
        background-size: 0% 100%;
        width: 1000px;
        /* background: rgb(255,255,255); */
        height: 3px;
        position: absolute;
    }
    
    .silder #start {
        background: #ffffff;
        width: 2px;
        height: 50px;
        position: absolute;
    }
    
    .silder #end {
        background: #ffffff;
        width: 2px;
        height: 50px;
        position: absolute;
    }
    
    .silder #unit {
        background: #ffffff;
        width: 2px;
        height: 50px;
        position: absolute;
    }
    
    .silder #move {
        background: rgb(0, 0, 255);
        width: 3px;
        height: 50px;
        position: absolute;
    }

    /* 在Chrome浏览器下 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

/* 在Firefox浏览器下 */
input[type="number"] {
    -moz-appearance: textfield;
}
input {
    height: 80px;
    width: 80px;
}
    `
}