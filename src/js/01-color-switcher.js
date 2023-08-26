const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
const delay = 1000;

// disabled stop btn at the beggining
disablingStopBtn();

// function to get random color in hex
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// function disabling start btn
function disablingStartBtn() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

// function disabling stops btn
function disablingStopBtn() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// function setting background color of body
function setBodyBgRandomColor() {
  body.style.backgroundColor = getRandomHexColor();
}

// listener for start btn
startBtn.addEventListener('click', () => {
  setBodyBgRandomColor();
  timerId = setInterval(() => {
    setBodyBgRandomColor();
  }, delay);
  disablingStartBtn();
});

// listener for stop btn
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  disablingStopBtn();
});
