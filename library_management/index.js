let searchInput = document.getElementById("searchInput");
let noResultPara = document.getElementById("noResultPara");
let popularHeading = document.getElementById("popularHeading");
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById("spinner")
let seachInputValue = ""

function createAndAppendSearchResult(result) {
    let {
        title,
        imageLink,
        author
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("country-card", "col-6")
    searchResults.appendChild(resultItemEl);

    let imageEl = document.createElement("img");
    imageEl.classList.add("image", "mt-auto", "mb-auto")
    imageEl.src = imageLink;
    resultItemEl.appendChild(imageEl);

    let authorEl = document.createElement("p");
    authorEl.classList.add("author-name")
    authorEl.textContent = author;
    resultItemEl.appendChild(authorEl);
}

function displayingResults(searchResults) {
    spinner.classList.toggle("d-none")

    if (searchResults.length === 0) {
        noResultPara.textContent = "No reuslts found";
    } else {
        popularHeading.textContent = "popular Books"
        for (let result of searchResults) {
            createAndAppendSearchResult(result)
        }
    }



}

function searchBook(event) {
    seachInputValue = event.target.value
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none")

        let userValue = searchInput.value
        let url = "https://apis.ccbp.in/book-store?title=" + userValue
        let options = {
            method: "GET"
        }

        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jasonData) {
                let {
                    search_results
                } = jasonData
                displayingResults(search_results)
            })
    }

}


searchInput.addEventListener("keydown", searchBook)