const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let signValue = "";
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let atr = e.target.getAttribute('value');
        if (isFirstValue === false) {
            getFirstValue(atr);
        } else {
            getSecondValue(atr);
        }
    });
}

function getFirstValue(el) {
    result.innerHTML = "";
    firstValue += el;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
}

function getSecondValue(el) {
    if (firstValue !== "" && signValue !== "") {
        secondValue += el;
        result.innerHTML = secondValue;
        secondValue = +secondValue;
    }
}

function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) => {
            signValue = e.target.getAttribute('value');
            isFirstValue = true;
        });
    }
}
getSign();

equals.addEventListener('click', () => {
    result.innerHTML = "";
    if (signValue === "+") {
        resultValue = firstValue + secondValue;
    } else if (signValue === "-") {
        resultValue = firstValue - secondValue;
    } else if (signValue === "x") {
        resultValue = firstValue * secondValue;
    } else if (signValue === "/") {
        resultValue = firstValue / secondValue;
    }
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";

    checkResultLength();
});

function checkResultLength() {
    resultValue = JSON.stringify(resultValue);

    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue !== "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    } else if (firstValue !== "" && secondValue !== "" && signValue !== "") {
        resultValue = -resultValue;
    }
    result.innerHTML = resultValue;
});

percent.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue !== "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    } else if (firstValue !== "" && secondValue !== "" && signValue !== "") {
        resultValue = resultValue / 100;
    }
    result.innerHTML = resultValue;
});

clear.addEventListener('click', () => {
    result.innerHTML = 0;
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    signValue = "";
    resultValue = 0;
});