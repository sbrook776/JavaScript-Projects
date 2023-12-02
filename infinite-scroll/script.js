const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loaderBackground");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
// set const count to lower number initially on load to improve performance.
const count = 5;
const apiKey = "cwYGgWxx8YJVOs5KnJEfhwaQmRbKNmNbKBRWEkjtOvk";

let ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		// can use , or + to add variable and strings in console log
		initialCount();
	}
}

// Checks initial count
function initialCount() {
	if (count <= 10) {
		count = 10;
	}
}

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements for links & photos, Add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function of each object in photosArray
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement("a");
		// Old replaced code below.
		// item.setAttribute("href", photo.links.html);
		// item.setAttribute("target", "_blank");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});
		// Create <img> for photo
		const img = document.createElement("img");
		// Replaced code below.
		// img.setAttribute("src", photo.urls.regular);
		// img.setAttribute("alt", photo.alt_description);
		// img.setAttribute("title", photo.alt_description);
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Event listener, check when each has finished loading
		img.addEventListener("load", imageLoaded);
		//Put <img> inside of <a> and then put both inside of imageContainer element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API

async function getPhotos() {
	try {
		const response = await fetch(ApiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		// Catch Error Here
	}
}

// Check to see if scroll near bottom of page, Load more photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On Load
getPhotos();
