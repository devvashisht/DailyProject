const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const   loader = document.getElementById('loader');
let apiQuotes = [];
// Show new quote 

function loading() {
    loader.hidder = false;
    quoteContainer.hidden = true;

}
function complete(){

    quoteContainer.hidden = false;
    loader.hidden = true;
}
function newQuote() {
    loading();
    //  Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');

    }else{
        quoteText.classList.remove('long-quote');
    }
    complete();
    console.log(quote);
}
//  get quotes from API
async function getQuote() {
    loading();
    const apiUrl = 'http://type.fit/api/quotes';
    try{
const  response = await fetch(apiUrl);
console.log(response);
apiQuotes = await response.json();
console.log(apiQuotes);
    } catch(e){

    }
    newQuote();

}

getQuote(); 

// to tweet a quote with
tweetAQuote = () => {
    const twitterUrl = `http://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText)} - ${encodeURIComponent(authorText.innerText)}`;
    window.open(twitterUrl, '_blank');
}
 newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetAQuote);
