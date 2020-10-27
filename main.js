;
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// When loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Loading complete
function loaded() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Generate a new quote
function newQuote() {
  loading();
  return apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}
// Get Quotes From API
async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        updateQuote(newQuote());
    }
    catch (error) {
        getQuotes();
        console.log(`An error occurced: ${error}`)
    }
}

// Update Quotes in DOM
function updateQuote(quote) {
  if (quote.text.length <= 75) {
    quoteText.classList.add('short-quote')
  }
  else {
    quoteText.classList.remove('short-quote')
  }
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author ? quote.author : "Unknown";
    loaded();
}

// Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', () => updateQuote(newQuote()));

// On Load
getQuotes()
