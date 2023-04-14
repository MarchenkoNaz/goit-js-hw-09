const start = document.querySelector('[data-start]')
const stop = document.querySelector('[data-stop]')
const body = document.querySelector('body')

start.addEventListener('click', onStart)
stop.addEventListener('click', onStop)
//#on start
let timerId = null;
stop.disabled = true

function onStart() {
	console.clear()
	timerId = setInterval(() => {
		const hexColor = getRandomHexColor()
		body.style.backgroundColor = hexColor;
		console.log(`Current color of body ${hexColor}`);
	}, 1000)
	stop.disabled = false
	if (!stop.disabled) {
		start.disabled = true
	}
}


//#on stop
function onStop() {
	clearInterval(timerId)
	start.disabled = false
	if (!start.disabled) {
		stop.disabled = true
	}
}


//random colorpicker
function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, 0)}`;
}

