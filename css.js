let a = document.createElement("style");
a.innerHTML = `
.silder #background {
    /* background: linear-gradient(to right, #ffffff, #ffffff 80%, #000000 100%); */
    background: -webkit-linear-gradient(rgb(0, 0, 255), #ddd) no-repeat, #ddd;
    background-size: 0% 100%;
    width: 1000px;
    /* background: rgb(255,255,255); */
    height: 3px;
    margin: 100px 0 100px 0;
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
    margin: 100px 0 100px 0;
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
    width: 8px;
    height: 50px;
    position: absolute;
}

.tit {
    margin: 100px 0 200px 0;
    text-align: left;
    font-size: 50px;
    position: absolute;
    user-select: none;
}

.label {
    font-size: 30px;
    user-select: none;
}

.label div {
    position: absolute;
}

p {
    text-align: left;
    text-indent: 2em;
}

#GuessNum {
    text-align: center;
    width: 100px;
    height: 100px;
    font-size: 20px;
}

/* 在Chrome浏览器下 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

/* 在Firefox浏览器下 */
input[type="number"] {
    -moz-appearance: textfield;
}`;
document.head.appendChild(a);