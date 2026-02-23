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

function startQuiz(subject) {
    currentQuestions = subjects[subject];
    currentIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
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
