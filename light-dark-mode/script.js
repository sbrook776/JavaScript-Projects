const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.querySelector("#nav");
const toggleIcon = document.querySelector("#toggle-icon");
const image1 = document.querySelector("#img1");
const image2 = document.querySelector("#img2");
const image3 = document.querySelector("#img3");
const textBox = document.querySelector("#text-box");
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

// Dark or Light Images
function imageMode(color) {
	image1.src = `img/undraw_proud_coder_${color}.svg`;
	image2.src = `img/undraw_feeling_proud_${color}.svg`;
	image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleDarkLightMode(mode) {
	nav.style.backgroundColor =
		mode === "dark" ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255 / 50%)";
	textBox.style.backgroundColor =
		mode === "dark" ? "rgb(255 255 255 / 50%)" : "rgb(0 0 0 / 50%)";
	toggleIcon.children[0].textContent =
		mode === "dark" ? "Dark Mode" : "Light Mode";
	mode === "dark"
		? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
		: toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
	mode === "dark" ? imageMode("dark") : imageMode("light");
}
// Switch Theme Dynamically
function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute("data-theme", "dark");
		localStorage.setItem("theme", "dark");
		toggleDarkLightMode("dark");
	} else {
		document.documentElement.setAttribute("data-theme", "light");
		localStorage.setItem("theme", "light");
		toggleDarkLightMode("light");
	}
}

// Event Listeners
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage for Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
	document.documentElement.setAttribute("data-theme", currentTheme);

	if (currentTheme === "dark") {
		toggleSwitch.checked = true;
		toggleDarkLightMode("dark");
	}
}
