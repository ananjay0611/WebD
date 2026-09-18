const guessInput =
    document.getElementById("guessInput");

const guessBtn =
    document.getElementById("guessBtn");

const restartBtn =
    document.getElementById("restartBtn");

const message =
    document.getElementById("message");

const guessCount =
    document.getElementById("guessCount");

const remaining =
    document.getElementById("remaining");

const guessedNumbers =
    document.getElementById("guessedNumbers");


let secretNumber =
    Math.floor(Math.random() * 100) + 1;


let attempts = 0;

let guesses = [];

const maxAttempts = 10;

let gameOver = false;


function makeGuess() {

    if (gameOver) {

        return;
    }


    const guess =
        Number(guessInput.value);


    if (
        guess < 1 ||
        guess > 100 ||
        guessInput.value === ""
    ) {

        message.textContent =
            "Please enter a number between 1 and 100.";

        message.className = "error";

        return;
    }


    if (attempts >= maxAttempts) {

        return;
    }


    attempts++;

    guesses.push(guess);


    guessCount.textContent =
        attempts;

    remaining.textContent =
        maxAttempts - attempts;


    displayGuess(guess);


    if (guess === secretNumber) {

        message.textContent =
            `🎉 Correct! You found ${secretNumber}!`;

        message.className =
            "success";

        gameOver = true;

        guessInput.disabled = true;

        guessBtn.disabled = true;

        restartBtn.style.display =
            "block";

    }


    else if (guess < secretNumber) {

        message.textContent =
            "↑ Too low! Try a higher number.";

        message.className =
            "low";
    }


    else {

        message.textContent =
            "↓ Too high! Try a lower number.";

        message.className =
            "high";
    }


    if (
        attempts === maxAttempts &&
        guess !== secretNumber
    ) {

        message.textContent =
            `Game Over! The number was ${secretNumber}.`;

        message.className =
            "error";

        gameOver = true;

        guessInput.disabled = true;

        guessBtn.disabled = true;

        restartBtn.style.display =
            "block";
    }


    guessInput.value = "";

    guessInput.focus();
}


function displayGuess(number) {

    const span =
        document.createElement("span");

    span.className =
        "guess";

    span.textContent =
        number;


    const empty =
        guessedNumbers.querySelector(".empty");

    if (empty) {

        empty.remove();
    }


    guessedNumbers.appendChild(span);
}


function restartGame() {

    secretNumber =
        Math.floor(Math.random() * 100) + 1;


    attempts = 0;

    guesses = [];

    gameOver = false;


    guessCount.textContent =
        "0";

    remaining.textContent =
        "10";

    guessedNumbers.innerHTML =
        '<span class="empty">No guesses yet</span>';


    message.textContent =
        "Enter your guess below";

    message.className = "";


    guessInput.disabled =
        false;

    guessBtn.disabled =
        false;


    restartBtn.style.display =
        "none";


    guessInput.value = "";

    guessInput.focus();
}


guessBtn.addEventListener(
    "click",
    makeGuess
);


restartBtn.addEventListener(
    "click",
    restartGame
);


guessInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            makeGuess();
        }

    }
);


guessInput.focus();