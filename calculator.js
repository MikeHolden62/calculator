// Globals
let numberIn = '0';
let stack = [];
let result_showing = false;

// Add event listener for number buttons
const numbers = document.querySelectorAll('.number, .zero, .point');
numbers.forEach(number => number.addEventListener('click', procNumber));

// Add event listener for function buttons
const functs = document.querySelectorAll('.function');
functs.forEach(funct => funct.addEventListener('click', procFunction));

// Add event listener for operation buttons
const operators = document.querySelectorAll('.operator, .percent');
operators.forEach(operator => operator.addEventListener('click', oppFunction));

// Functions
let add = function (a, b) {
    return (a + b);
}

let subtract = function (a, b) {
    return (a - b);
}

let multiply = function (a, b) {
    return (a * b);
}

let divide = function (a, b) {
    return (a / b);
}

let operate = function (a, opp, b) {

    a = a * 1;
    b = b * 1;

    switch (opp) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
}

function adjust_font_size(disp) {

    // Adjust the font size as the string gets longer
    if (disp.innerHTML.length > 0) disp.style.fontSize = '30px';
    if (disp.innerHTML.length > 11) disp.style.fontSize = '20px';
    if (disp.innerHTML.length > 16) disp.style.fontSize = '15px';
    if (disp.innerHTML.length > 22) disp.style.fontSize = '10px';
    if (disp.innerHTML.length > 32) disp.style.fontSize = '6px';

}

// Event listener for number buttons
function procNumber(e) {

    // Ignore leading zero
    if (numberIn == '0') {
        numberIn = ''
    }

    // If a result is showing, clear it rather than add more numbers to it
    if (result_showing == true) {
        numberIn = ''
        result_showing = false;
    }

    // Ignore a new decimal point if one already in number
    if (numberIn.includes(".")) {
        if (this.id == ".") {
            return;
        }
    }

    // Add the number pressed to the working number
    numberIn = numberIn + this.id;
    let disp = document.getElementById("display");
    disp.innerHTML = numberIn;
    adjust_font_size(disp);

}

// Event listener for function buttons
function procFunction(e) {

    let disp = document.getElementById("display");

    switch (this.id) {

        // Clear button pressed
        case 'C':
            numberIn = '0';
            stack = [];
            disp.innerHTML = numberIn;
            adjust_font_size(disp);
            break;

        // +/- button pressed
        case '+/-':

            if (numberIn == "") {
                numberIn = stack[0];
                stack = [];
            }
            let cal = numberIn * -1;
            numberIn = cal.toString();
            disp.innerHTML = numberIn;
            adjust_font_size(disp);
            break;

        // % button pressed
        case '%':
            if (numberIn == "") {
                numberIn = stack[0];
                stack = [];
            }
            if (stack.length == 0) {
                let cal = numberIn / 100;
                numberIn = cal.toString();
            } else {
                let cal = stack[stack.length - 2] * numberIn / 100;
                numberIn = cal.toString();
            }

            disp.innerHTML = numberIn;
            adjust_font_size(disp);
            break;

    }

}

// Event listener for operator buttons
function oppFunction(e) {

    // If the stack is empty and the number is empty, ignore the spare operator
    if (stack.length == 0 && numberIn == "") {
        return;
    }

    // If just an operator is sent, replace the one at top of stack
    if (stack.length != 0 && numberIn == "") {
        stack[stack.length - 1] = this.id;
    }

    // Push the number and operator on to the stack & clear the number
    if (numberIn != "") {
        stack.push(numberIn);
        stack.push(this.id);
        numberIn = '';
    }

    // If '=' sent, do the calculation starting from the bottom of the stack,
    // replacing the bottom 3 elements with the result of their operation
    if (this.id == '=') {

        while (stack.length > 2) {
            let result = operate(stack[0], stack[1], stack[2]);
            stack.splice(0, 3, result.toString());
        }

        // Result of the calculation is now in stack[0] and stack[1] contains the = sign

        // Display the result and clear the stack
        numberIn = stack[0];
        stack = [];
        let disp = document.getElementById("display");
        disp.innerHTML = numberIn;
        adjust_font_size(disp);
        result_showing = true;

    }

}