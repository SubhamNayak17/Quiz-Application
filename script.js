const questions = [
    {
        question: "Which of the following is used to declare a block-scoped variable?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: true },
            { text: "set", correct: false },
            { text: "decl", correct: false }
        ]
    },
    {
        question: "What is the output of 'typeof null'?",
        answers: [
            { text: "'null'", correct: false },
            { text: "'undefined'", correct: false },
            { text: "'object'", correct: true },
            { text: "'string'", correct: false }
        ]
    },
    {
        question: "Which method is used to add an element to the end of an array?",
        answers: [
            { text: "push()", correct: true },
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "join()", correct: false }
        ]
    },

    {
        question: "Which operator is used to check for both value and type equality?",
        answers: [
            { text: "==", correct: false },
            { text: "=", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false }
        ]
    },

    {
        question: "How do you create a function in JavaScript?",
        answers: [

            { text: "function = myFunction()", correct: false },
            { text: "function myFunction()", correct: true },
            { text: "function:myFunction()", correct: false },
            { text: "create myFunction()", correct: false }
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [

            { text: "onmouseclick", correct: false },
            { text: "onchange", correct: false },
            { text: "onmouseover", correct: false },
            { text: "onclick", correct: true }
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [

            { text: "Display Object Management", correct: false },
            { text: "Document Object Model", correct: true },
            { text: "Digital Objects Model", correct: false },
            { text: "Desktop Oriented Mode", correct: false }
        ]
    },
    {
        question: "Which of these is a way to handle asynchronous code in JS?",
        answers: [

            { text: "Loops", correct: false },
            { text: "CSS selectors", correct: false },
            { text: "Promises", correct: true },
            { text: "Break statements", correct: false }
        ]
    },
    {
        question: "What will '5' + 2 evaluate to?",
        answers: [
            { text: "52", correct: true },
            { text: "7", correct: false },
            { text: "NaN", correct: false },
            { text: "Error", correct: false }
        ]
    },
    {
        question: "Which method converts a JSON string into a JavaScript object?",
        answers: [

            { text: "JSON.stringify()", correct: false },
            { text: "JSON.toObject()", correct: false },
            { text: "JSON.parse()", correct: true },
            { text: "JSON.convert()", correct: false }
        ]
    },
    {
        question: "How do you start a FOR loop?",
        answers: [
            { text: "for (i = 0; i <= 5)", correct: false },
            { text: "for (i = 0; i <= 5; i++)", correct: true },
            { text: "for (i <= 5; i++)", correct: false },
            { text: "for i = 1 to 5", correct: false }

        ]
    },
    {
        question: "Which built-in method returns the length of a string?",
        answers: [

            { text: "size()", correct: false },
            { text: "length", correct: true },
            { text: "index()", correct: false },
            { text: "None of the above", correct: false }
        ]
    },

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}




function resetState() {
    nextBtn.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

