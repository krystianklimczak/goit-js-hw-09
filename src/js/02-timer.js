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
let isTimeChosen = false;
const delay = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date() && !isTimeChosen) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else if (!isTimeChosen) {
      startBtn.disabled = false;
      selectedDate = selectedDates[0];
    } else {
      Notiflix.Notify.success(
        'Timer is running, if u want change time, refresh page'
      );
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

startBtn.addEventListener('click', e => {
  isTimeChosen = true;
  settingTime();
  timerId = setInterval(() => {
    settingTime();
    if (Object.values(timeLeft).every(checkIfZero)) {
      clearInterval(timerId);
    }
  }, delay);
  startBtn.disabled = true;
});
