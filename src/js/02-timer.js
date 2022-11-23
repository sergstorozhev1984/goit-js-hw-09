import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStartEl: document.querySelector('[data-start]'),
    timerFieldDays: document.querySelector('[data-days]'),
    timerFielHours: document.querySelector('[data-hours]'),
    timerFieldMinutes: document.querySelector('[data-minutes]'),
    timerFieldSeconds: document.querySelector('[data-seconds]'),
}

refs.btnStartEl.disabled = true;
let timerIntervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      refs.btnStartEl.disabled = false;
    } else {
      refs.btnStartEl.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

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
  return String(value).padStart(2, 0);
}

const calendar = flatpickr('#datetime-picker', options);

refs.btnStartEl.addEventListener('click', onBtnStartEl);

function onBtnStartEl() {
  const selectedDate = calendar.selectedDates[0];

  timerIntervalId = setInterval(() => {
    const startTime = new Date();
    const decrementTime = selectedDate - startTime;
    refs.btnStartEl.disabled = true;

    if (decrementTime < 0) {
      clearInterval(timerId);
      return;
    }
    showTimer(convertMs(decrementTime));
  }, 1_000);
}

function showTimer(options) {
  refs.timerFieldDays.textContent = addLeadingZero(options.days);
  refs.timerFielHours.textContent = addLeadingZero(options.hours);
  refs.timerFieldMinutes.textContent = addLeadingZero(options.minutes);
  refs.timerFieldSeconds.textContent = addLeadingZero(options.seconds);
}
console.log(options);


