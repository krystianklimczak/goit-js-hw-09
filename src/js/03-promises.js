import Notiflix from 'notiflix';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btn = document.querySelector('button[type=submit]');

let delayInput;
let stepInput;
let amountInput;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  if (shouldResolve) {
    promise.then(result => {
      Notiflix.Notify.success(result);
    });
  } else {
    promise.catch(error => {
      Notiflix.Notify.failure(error);
    });
  }
}

delay.addEventListener('input', e => {
  delayInput = parseInt(e.target.value);
});
step.addEventListener('input', e => {
  stepInput = parseInt(e.target.value);
});
amount.addEventListener('input', e => {
  amountInput = parseInt(e.target.value);
});

btn.addEventListener('click', e => {
  e.preventDefault();
  let timeDelay = delayInput;
  for (let i = 1; i <= amountInput; i++) {
    createPromise(i, timeDelay);
    timeDelay += stepInput;
  }
});
