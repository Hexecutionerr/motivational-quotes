const quotes = [
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "You are stronger than you think.", author: "Unknown" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Little by little, a little becomes a lot.", author: "Tanzanian Proverb" }
];

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');

function randomQuote() {
    const idx = Math.floor(Math.random() * quotes.length);
    const q = quotes[idx];
    quoteEl.textContent = q.text;
    authorEl.textContent = q.author ? `— ${q.author}` : '';
}

// Tweet current quote
function tweetQuote() {
    const text = quoteEl.textContent;
    const author = authorEl.textContent;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + author)}`;
    window.open(url, '_blank');
}

newBtn.addEventListener('click', randomQuote);
tweetBtn.addEventListener('click', tweetQuote);

// show one on load
randomQuote();
