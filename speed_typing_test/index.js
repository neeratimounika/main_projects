let timer = document.getElementById("timer");
let userText = document.getElementById("quoteInput");
let quoteDisplay = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");

let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");

let spinner = document.getElementById("spinner");
let intervelId = null
let count = 0

function verify(intervelId, textquote, count) {
    if (userText.value === textquote) {
        clearInterval(intervelId)
        userText.value = '';
        count = 0
        resultEl.textContent = "You typed in " + count + " seconds"

    } else {
        resultEl.textContent = "You typed incorrect sentence"
    }

}


function displayingResults(text) {
    spinner.classList.add("d-none")
    quoteDisplay.classList.remove("d-none")

    quoteDisplay.textContent = text

    intervelId = setInterval(function() {
        count = count + 1
        timer.textContent = count
    }, 1000);

    submitBtn.onclick = function() {
        verify(intervelId, text, count)
    }
    resetBtn.onclick = function() {
        quoteDisplay.textContent = ""
        clearInterval(intervelId)
        gettingRandomQuote()
        count = 0
        resultEl.textContent = ""
    }
}

function gettingRandomQuote() {
    spinner.classList.remove("d-none")
    quoteDisplay.classList.add("d-none")
    fetch("https://apis.ccbp.in/random-quote")
        .then(function(response) {
            return response.text()
        })
        .then(function(textt) {
            let text = JSON.parse(textt).content
            displayingResults(text)

        })
}
gettingRandomQuote()