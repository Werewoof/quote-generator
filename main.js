;
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const getNewQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function getNewQuote() {
  showLoadingSpinner();
  return apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}
async function fetchQuotesFromAPI(retriesLeft) {
    const apiUrl = "https://type.fit/api/quotes";
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      updateQuoteInDOM(getNewQuote());
    }
    catch (error) {
      if (retriesLeft > 0) {
        fetchQuotesFromAPI(retriesLeft-=1);
      }
      else {
        apiQuotes = [{text: "An error occurred and a quote couldn't be gotten :(", author: ""}]
        updateQuoteInDOM(getNewQuote());
      }
    }
}

function updateQuoteInDOM(quote) {
  if (quote.text.length <= 75) {
    quoteText.classList.add('short-quote')
  }
  else {
    quoteText.classList.remove('short-quote')
  }
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author ? quote.author : "Unknown";
    hideLoadingSpinner();
}

function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners

twitterBtn.addEventListener('click', tweetQuote);
getNewQuoteBtn.addEventListener('click', () => updateQuoteInDOM(getNewQuote()));

// On Load
fetchQuotesFromAPI(10)
