import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let timeLeft;
let timerId = null;
let selectedDate;
const delay = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date() && !isTimeChosen) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};

startBtn.disabled = true;
flatpickr(datePicker, options);

function checkIfZero(value) {
  return value === 0;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function settingTime() {
  const defaultDate = new Date();
  timeLeft = convertMs(selectedDate - defaultDate);
  days.innerHTML = addLeadingZero(timeLeft.days);
  hours.innerHTML = addLeadingZero(timeLeft.hours);
  minutes.innerHTML = addLeadingZero(timeLeft.minutes);
  seconds.innerHTML = addLeadingZero(timeLeft.seconds);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', e => {
  datePicker.disabled = true;
  let isStopVisible = false;
  let deg = 0;
  const stopbtn = document.querySelector('.invisible');
  settingTime();
  timerId = setInterval(() => {
    settingTime();
    if (Object.values(timeLeft).every(checkIfZero)) {
      clearInterval(timerId);
      // Nieobowiązkowy dodatek do zadania z nudów w trakcie oczekiwania na akceptację
      timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        stopbtn.style.transform = `rotate(${deg}deg)`;
        deg += 2;
        if (deg === 360) {
          deg = 0;
        }

        if (!isStopVisible) {
          stopbtn.classList.remove('invisible');
          isStopVisible = true;
        }
        stopbtn.addEventListener('click', e => {
          clearInterval(timerId);
          stopbtn.classList.add('invisible');
          location.reload();
        });
      }, 50);
      // Nieobowiązkowy dodatek do zadania z nudów w trakcie oczekiwania na akceptację
    }
  }, delay);
  startBtn.disabled = true;
});
