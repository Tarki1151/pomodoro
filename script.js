let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;
let pomodoroCount = 0;
let isBreak = false;

const minTensImg = document.getElementById('minTens');
const minOnesImg = document.getElementById('minOnes');
const secTensImg = document.getElementById('secTens');
const secOnesImg = document.getElementById('secOnes');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const pomodoroCountSpan = document.getElementById('pomodoroCount');
const statusDiv = document.getElementById('status');

// Sesler
const startSound = new Audio('start.mp3');
const restSound = new Audio('rest.mp3');

function updateDisplay() {
    const minTens = Math.floor(minutes / 10);
    const minOnes = minutes % 10;
    const secTens = Math.floor(seconds / 10);
    const secOnes = seconds % 10;

    minTensImg.src = `images/${minTens}.png`;
    minOnesImg.src = `images/${minOnes}.png`;
    secTensImg.src = `images/${secTens}.png`;
    secOnesImg.src = `images/${secOnes}.png`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startSound.play();
    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                isRunning = false;
                if (!isBreak) {
                    pomodoroCount++;
                    pomodoroCountSpan.textContent = pomodoroCount;
                    startBreak();
                } else {
                    startWork();
                }
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

function startBreak() {
    restSound.play();
    isBreak = true;
    statusDiv.textContent = pomodoroCount % 4 === 0 ? "Uzun Ara" : "Kısa Ara";
    minutes = pomodoroCount % 4 === 0 ? 15 : 5; // 4. Pomodoro'da 15 dk, diğerlerinde 5 dk
    seconds = 0;
    updateDisplay();
    alert(pomodoroCount % 4 === 0 ? "15 dakikalık uzun ara!" : "5 dakikalık kısa ara!");
}

function startWork() {
    isBreak = false;
    statusDiv.textContent = "Çalışma Zamanı";
    minutes = 25;
    seconds = 0;
    updateDisplay();
    alert("Yeni bir Pomodoro başlıyor!");
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isBreak = false;
    minutes = 25;
    seconds = 0;
    pomodoroCount = 0;
    pomodoroCountSpan.textContent = pomodoroCount;
    statusDiv.textContent = "Çalışma Zamanı";
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();