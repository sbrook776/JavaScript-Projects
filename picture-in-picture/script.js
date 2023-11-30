const btn = document.querySelector("#button");

function btnDown() {
	btn.firstChild.style.transform = "translate(0, 1px)";
}

function btnUp() {
	btn.firstChild.style.transform = "translate(0, -1px)";
}

btn.addEventListener("mousedown", btnDown);
btn.addEventListener("mouseup", btnUp);
