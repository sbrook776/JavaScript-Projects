const button = document.querySelector("#button");
const videoElement = document.querySelector("#video");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElement.srcObject = mediaStream;
		videoElement.onloadedmetadata = () => {
			videoElement.play();
		};
	} catch (error) {
		// Catch error here
		console.log("whoops, error here!", error);
	}
}

button.addEventListener("click", async () => {
	// Disable button
	button.disabled = true;
	// Start picture in picture
	await videoElement.requestPictureInPicture();
	// Reset button
	button.disabled = false;
});

// On load
selectMediaStream();
