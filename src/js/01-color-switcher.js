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

// inline styles
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.alignItems = 'center';
// body.style.justifyItems = 'center';
body.style.gap = '15px';

const btn = document.querySelectorAll('button');
btn.forEach(e => {
  e.style.padding = '5px 15px';
});
