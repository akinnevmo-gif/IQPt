// LOGIN
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    window.location.href = "dashboard.html";
}

function login() {
    if (
        document.getElementById("email").value === localStorage.getItem("userEmail") &&
        document.getElementById("password").value === localStorage.getItem("userPassword")
    ) {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Credentials");
    }
}

// EXAM COUNTDOWN (SET YOUR REAL WAEC DATE HERE)
const examDate = new Date("June 1, 2026 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = examDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        countdownElement.innerText = `WAEC starts in ${days} days ${hours} hours`;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// SUBJECT QUESTIONS
const subjects = {
    math: [
        {question:"10 + 5 = ?", options:["12","15","20"], answer:"15"},
        {question:"Square root of 16?", options:["3","4","6"], answer:"4"}
    ],
    english: [
        {question:"Synonym of Big?", options:["Small","Large","Tiny"], answer:"Large"},
        {question:"Opposite of Fast?", options:["Slow","Quick","Speed"], answer:"Slow"}
    ]
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let questionTimer;

function startQuiz(subject) {
    currentQuestions = subjects[subject];
    currentIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(questionTimer);
    let timeLeft = 15;
    document.getElementById("timer").innerText = `Time: ${timeLeft}s`;

    questionTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);

    const q = currentQuestions[currentIndex];
    document.getElementById("question").innerText = q.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const div = document.createElement("div");
        div.className = "option";
        div.innerText = option;
        div.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(div);
    });
}

function checkAnswer(selected) {
    if (selected === currentQuestions[currentIndex].answer) {
        score++;
    }
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        clearInterval(questionTimer);
        document.getElementById("question").innerText = "Quiz Completed!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("score").innerText = "Score: " + score;
        saveScore(score);
    }
}

// LEADERBOARD
function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(score);
    localStorage.setItem("scores", JSON.stringify(scores));
    loadLeaderboard();
}

function loadLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort((a,b)=>b-a);

    const leaderboard = document.getElementById("leaderboard");
    if(leaderboard){
        leaderboard.innerHTML = scores.map(s => `<p>Score: ${s}</p>`).join("");
    }
}

loadLeaderboard();
