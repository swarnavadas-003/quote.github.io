const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newquoteButton = document.getElementById('new-quote');
const load = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading() {
    load.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    quoteContainer.hidden = false;
    load.hidden = true;
}

//show new quote
function newQuote() {
    loading();

    //picking a random quote from api quote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //check if author field is blank then replace it with "unknown"
    if (!quote.author) {
        authorText.textContent = "Unknown";
    }
    else
    {
        authorText.textContent = quote.author;
    }

    //check quote length to determine styling
    if (quote.text.length > 100)
    {
        quoteText.classList.add('long-text');
    }
    else
    {
        quoteText.classList.remove('long-text'); 
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// get quote from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error){
    }
}

// tweet qoute
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listener
newquoteButton.addEventListener('click' , newQuote);
twitterButton.addEventListener('click' , tweetQuote );

//on load
getQuotes();
