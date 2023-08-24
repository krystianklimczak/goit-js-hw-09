const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
const delay = 1000;

disablingStopBtn();

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disablingStartBtn() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function disablingStopBtn() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function setBodyBgRandomColor() {
  body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  setBodyBgRandomColor();
  timerId = setInterval(() => {
    setBodyBgRandomColor();
  }, delay);
  disablingStartBtn();
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  disablingStopBtn();
});
