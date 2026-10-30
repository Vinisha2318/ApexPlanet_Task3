
// QUIZ FUNCTIONALITY

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: [
            "Java",
            "CSS",
            "Python",
            "C"
        ],
        answer: 1
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: [
            "int",
            "string",
            "let",
            "float"
        ],
        answer: 2
    },
    {
        question: "Which method prints output in the browser console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "write()"
        ],
        answer: 0
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "<!-- -->",
            "//",
            "**",
            "##"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let totalScore = 0;
let answered = false;

function loadQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    document.getElementById("question").textContent =
        q.question;

    document.getElementById("result").textContent = "";

    document.getElementById("score").textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = function() {
            checkAnswer(index, button);
        };

        optionsDiv.appendChild(button);

    });

    document.getElementById("nextBtn").textContent =
        currentQuestion === questions.length - 1
        ? "Finish Quiz"
        : "Next Question";

}

function checkAnswer(selected, button) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allButtons = document.querySelectorAll("#options button");

    allButtons.forEach((btn, index) => {

        btn.disabled = true;

        if (index === correctAnswer) {
            btn.classList.add("correct");
        }

    });

    if (selected === correctAnswer) {

        totalScore++;

        document.getElementById("result").textContent =
            "Correct Answer! Well done.";

    } else {

        button.classList.add("wrong");

        document.getElementById("result").textContent =
            "Incorrect! The correct answer is " +
            questions[currentQuestion].options[correctAnswer];

    }

}

function nextQuestion() {

    if (!answered) {
        document.getElementById("result").textContent =
            "Please select an answer first!";
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        document.getElementById("question").textContent =
            "Quiz Completed!";

        document.getElementById("options").innerHTML = "";

        document.getElementById("result").textContent =
            "Your final score is " + totalScore +
            " out of " + questions.length;

        document.getElementById("score").textContent =
            "Great job!";

        document.getElementById("nextBtn").textContent =
            "Restart Quiz";

        document.getElementById("nextBtn").onclick =
            restartQuiz;

    }

}

function restartQuiz() {

    currentQuestion = 0;
    totalScore = 0;

    document.getElementById("nextBtn").onclick =
        nextQuestion;

    loadQuestion();

}


// Load first question
loadQuestion();


// API INTEGRATION - RANDOM JOKE

async function getJoke() {

    const jokeElement = document.getElementById("joke");

    jokeElement.textContent = "Loading joke...";

    try {

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch joke");
        }

        const data = await response.json();

        jokeElement.textContent =
            data.setup + " " + data.punchline;

    } catch (error) {

        jokeElement.textContent =
            "Sorry! Unable to load a joke. Please try again.";

        console.error(error);

    }

}
