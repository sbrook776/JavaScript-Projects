const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

// Disable/ Enable Button

function toggleButton() {
	button.disabled = !button.disabled;
}

// Passing our Joke to our VoiceRSS API
function tellMe(joke) {
	VoiceRSS.speech({
		key: "2565490227cd4a24adc40de011a1275a",
		src: joke,
		hl: "en-us",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
}

// Get Jokes from Joke API
async function getJokes() {
	let joke = "";
	const apiUrl =
		"https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		// Text to Speech
		// Disable Button
		toggleButton();
		tellMe(joke);
	} catch (error) {
		// Catch errors here
		console.log("whoops", error);
	}
}

// Event listeners

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
