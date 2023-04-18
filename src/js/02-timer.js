import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysField = document.querySelector('[data-days]')
const hoursField = document.querySelector('[data-hours]')
const minutesField = document.querySelector('[data-minutes]')
const secondsField = document.querySelector('[data-seconds]')
const startBtn = document.querySelector('[data-start]')
const inputTimer = document.querySelector('#datetime-picker')


const currentDate = Date.now();

startBtn.disabled = true
let intervalId = null;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		if (currentDate > selectedDates[0]) {
			Notify.failure('Choose date in the future')
			startBtn.disabled = true;
			return;
		}
		startBtn.disabled = false
	},
};

const flatpickrEl = flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', onStartBtn)

function onStartBtn() {

	startBtn.disabled = true;
	inputTimer.disabled = true

	const timeToEnd = calculateDeltaTime();

	if (timeToEnd <= 0) {
		Notify.failure('The date you have chosen has already arrived.');
		startBtn.disabled = false;
		inputTimer.disabled = false
		return;
	}

	const convertedTime = convertMs(timeToEnd);
	updateMarkupClocks(convertedTime);

	intervalId = setInterval(() => {
		const timeToEnd = calculateDeltaTime();

		if (timeToEnd <= 0) {
			Notify.success('The time is over.');
			clearInterval(intervalId);
			startBtn.disabled = false;
			inputTimer.disabled = false
			return;
		}

		const convertedTime = convertMs(timeToEnd);
		updateMarkupClocks(convertedTime)

	}, 1000)
}


function calculateDeltaTime() {
	return flatpickrEl.selectedDates[0].getTime() - Date.now();
}

function updateMarkupClocks({ days, hours, minutes, seconds }) {
	daysField.textContent = days
	hoursField.textContent = hours
	minutesField.textContent = minutes
	secondsField.textContent = seconds
}

function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	// Remaining days
	const days = addLeadingZero(Math.floor(ms / day));
	// Remaining hours
	const hours = addLeadingZero(Math.floor((ms % day) / hour));
	// Remaining minutes
	const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
	// Remaining seconds
	const seconds = addLeadingZero(
		Math.floor((((ms % day) % hour) % minute) / second)
	);

	return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
	return String(value).padStart(2, 0)
}
