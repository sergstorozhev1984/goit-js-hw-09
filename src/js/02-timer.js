import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { options } from "./parameters.js";
const {enableTime, time_24hr, defaultDate, minuteIncrement, onClose} = options;
console.log(onClose);