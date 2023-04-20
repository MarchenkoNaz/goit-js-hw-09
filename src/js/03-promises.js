import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const btnSubmit = form.querySelector('button[type="submit"]');

form.addEventListener('submit', evt => {
	evt.preventDefault();
	btnSubmit.setAttribute('disabled', '');

	const {
		elements: { delay, step, amount },
	} = evt.currentTarget;


	let currentDelay = Number(delay.value);
	let currentAmount = Number(amount.value)
	let currentStep = Number(step.value)


	function formValidation(delay, step, amount) {
		if (delay < 0 || step < 0 || amount < 0) {
			Notify.failure('Negative numbers are invalid.');
			return true;
		}
		return false;
	}

	if (formValidation(currentDelay, currentAmount, currentStep)) {
		btnSubmit.removeAttribute('disabled');

		return;
	}

	for (let i = 1; i <= currentAmount; i += 1) {

		createPromise(i, currentDelay)

			.then(value => Notify.success(value))

			.catch(error => Notify.failure(error))

			.finally(() => {
				if (currentAmount === i) {
					btnSubmit.removeAttribute('disabled');
				}
			});

		currentDelay += currentStep;

	}
});


function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		const shouldResolve = Math.random() > 0.3;

		setTimeout(() => {
			if (shouldResolve) {
				resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
			} else {
				reject(`❌ Rejected promise ${position} in ${delay}ms`);
			}
		}, delay);
	});
}