
/* Wait for the DOM to finish loading before running the game
 * Get the button elements and add event listeners to them
*/
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    /** this adds a listener to the Enter key on the keyboard so that our answers can log when user presses Enter on keyboard
     *This means the user don't always have to us the submit button to enter their answer */
    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }

    });

    runGame("addition");

});

/**
 * The main game "loop" will be called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // This sets the answer box to empty after each game is played and recorded
    document.getElementById("answer-box").value = "";

    //this lets the cursor stay in the answer-box rather than the user clicking in it to type answer
    document.getElementById("answer-box").focus();

    //This creates a random number between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivideQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknow game type: ${gameType}. Abborting!`;
    }
}

/**
 * checks the answer against the first element in the calculateCorrectAnswer()
 * array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Congrats! You got the correct answer");
        incrementScore();
    } else {
        alert(`Aww.. Your answer was wrong, your answer was ${userAnswer}, but the correct answer is ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the random numbers) and operator (addition, divide etc)
 * directly from the DOM and returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "*") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator} `);
        throw `Unimplemented operator ${operator}. Abborting!..`;
    }


}

/** 
 * Gets code from the DOM and increments it by 1, then displays it in the score box
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore;

}

/** 
 * Gets code from the DOM and increments it by 1, then displays it in the incorrect box
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
    /** we use ternary operation here to call an if statement on the subtract function 
     * so that if the first number is greater than the second number, 
     * the ternary function will automatically put the bigger number in front before the subtraction takes place
     * this is to avoid getting a negative (minus) result
     * */
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "*";

}

function displayDivideQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "/";

}