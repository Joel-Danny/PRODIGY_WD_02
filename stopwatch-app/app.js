// Get HTML elements
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lap-times');

// Stopwatch state variables
let startTime, elapsedTime = 0, intervalId;

// Start stopwatch
function startTimer() {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(updateTime, 10);
}

// Pause stopwatch
function pauseTimer() {
  clearInterval(intervalId);
  elapsedTime = Date.now() - startTime;
}

// Reset stopwatch
function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  display.textContent = '00:00:00';
  lapList.innerHTML = '';
}

// Record lap time
function lapTimer() {
  const lapTime = elapsedTime;
  const formattedLap = formatTime(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = formattedLap;
  lapList.appendChild(lapItem);
}

// Update displayed time
function updateTime() {
  const now = Date.now();
  const delta = now - startTime;
  elapsedTime = delta;
  const totalSec = Math.floor(delta / 1000);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec / 60) % 60;
  const hr = Math.floor(totalSec / 3600);
  display.textContent = `${padNumber(hr)}:${padNumber(min)}:${padNumber(sec)}`;
}

// Format time as HH:MM:SS
function formatTime(time) {
  const totalSec = Math.floor(time / 1000);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec / 60) % 60;
  const hr = Math.floor(totalSec / 3600);
  return `${padNumber(hr)}:${padNumber(min)}:${padNumber(sec)}`;
}

// Pad number with leading zero
function padNumber(num) {
  return num.toString().padStart(2, '0');
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
