const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");
let apiQuotes = [];

// Show loading
function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading Spinner
function hideLoadingSpinner() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Show new Quote

function newQuote() {
	// displays loader while getting quote
	showLoadingSpinner();
	// Pick random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	// check if author field is blank and replace it with 'unknown'
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}
	// check quote length to determine styling
	if (quote.text.length > 70) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}
	quoteText.textContent = quote.text;
	hideLoadingSpinner();
}
// Get quotes from API. This is stored locally after first fetch.
async function getQuotes() {
	showLoadingSpinner();
	const apiurl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
	try {
		const response = await fetch(apiurl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		//Catch error
	}
}

// Tweet a Quote

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet/?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
