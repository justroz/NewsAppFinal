let btnLogout = document.getElementById('btnLogout');
let articleDisplay = document.getElementById("articleDisplay")
let maxDay = document.getElementById("dateInput")
let dateInput = document.getElementById("dateInput")
let displayDate = document.getElementById("displayDate")
document.getElementById("submitForm").addEventListener("submit", submitFunction);
let sectionName = document.getElementById("sectionName")
let articleCount = document.getElementById("articleCount")

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
    } else {
        console.log('not logged in')
    }
});

//Adds functionality to logout button
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut()
    .then(() => {
        window.location.href = "login.html";
    })
    .catch(error => {
        console.log(error)
    })
});

//function to get the max date as today
function maxInputDay(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0
    let yyyy = today.getFullYear();
    if(dd < 10){
        dd = '0'+ dd
    }
    if(mm < 10){
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    maxDay.setAttribute("max", today);
 }
 maxInputDay()

//Retrieves json information and filters them by month and day
async function retrieveArticles (newsURL) {
    let response = await fetch(newsURL) //makes touch with the URL
    let json = await response.json() //access the data at the URL
    let articles = (Object.values(json)) //makes array of info in json
    console.log(articles)
    console.log("retrieve articles function successful")
    return articles

}

//Filters articles by day
function filterArticles(articles) {
    console.log(dateInput.value)
    let articulos = articles[1].docs
    let articleToReturn = articulos.filter(article => {
        if(sectionName.value === "null"){
            return article.pub_date.slice(0, 10) === dateInput.value 
        }else{
        return (article.pub_date.slice(0, 10) === dateInput.value && article.section_name === sectionName.value)
        }
    })
    
    console.log(articleToReturn)
    console.log("filter articles function successful")
    return articleToReturn
}


//Displays articles
function displayArticles(articlesToReturn){
    let countOfArticles = `<div>Your search returned ${articlesToReturn.length} articles.</div>`
    articleCount.innerHTML = countOfArticles
    if(articlesToReturn.length < 1){
        return articleDisplay.innerHTML = `<div class="noDataDiv">
                                            <span class="noDataDivMessage">Sorry, your search returned no articles.</span>
                                            </div>`
        
    }else if(articlesToReturn.length >= 1) { 
        searchedArticles = articlesToReturn.map(article => {    
        let authorName = ""    
        if(article.byline) {
            if(article.byline.original) {
                authorName = article.byline.original 
            } else {
                authorName = "Author Unknown"
            }   
        }    
        
        return `<div class="relevantArticles">
                    <div class="articleHeader">    
                        <span class="articleNewsDesk">${article.news_desk ? article.news_desk : "News Desk Unavailable"}</span>
                        <button class="articleFavoriteButton" id='${article._id}' onclick="favoriteClicked('${article.headline.main}', '${authorName}', '${article.snippet}', '${article.news_desk}', '${article.web_url}', '${article._id}')">&#10084;</button>
                    </div>
                    <div class="articleBody">
                        <span class="articleHeadlines"><b>${article.headline.main ? article.headline.main : "Title Unknown"}</b></span>
                        <span class="articleByline">${authorName}</span>
                        <span class="articleSnippet">${article.snippet ? article.snippet : "Snippet Unavailable"}</span>
                    </div>
                    <div class="articleFooter">
                        <a class="readArticleLink" href="${article.web_url}">${article.web_url ? "Read Article": "#"}</a>
                    </div>
                </div>`  
        })
    }

    articleDisplay.innerHTML = searchedArticles.join("")
    console.log("display articles function successful")     
    
}

//This returns the month to be searched
function monthInSearch(dateInput){
    let dateToSearch = dateInput.value.split("-");
    monthToSearch = dateToSearch[1];
    monthToSearch = parseInt(monthToSearch);
    return monthToSearch
}

//This function returns day to search
function dayInSearch(dateInput){
    let dateToSearch = dateInput.value.split("-");
    dayToSearch = dateToSearch[2];
    return dayToSearch
}

//This function returns year to search
function yearInSearch(dateInput){
    let dateToSearch = dateInput.value.split("-");
    yearToSearch = dateToSearch[0];
    return yearToSearch
}

//This function returns a reformatted date
function dateDisplay(monthToSearch, dayToSearch, yearToSearch){
let displayTheDate = monthToSearch + '/' + dayToSearch + '/' + yearToSearch
return displayTheDate
}

//This function runs when the submit button is clicked
async function submitFunction() {
    event.preventDefault()

    let monthToSearch = monthInSearch(dateInput)
    let dayToSearch = dayInSearch(dateInput)
    let yearToSearch = yearInSearch(dateInput)

    let newsURL = `https://api.nytimes.com/svc/archive/v1/${yearToSearch}/${monthToSearch}.json?api-key=GFEciqybc9QEdFHWzX02J6O85EHFpJah`

    let displayTheDate = dateDisplay(monthToSearch, dayToSearch, yearToSearch)

    displayDate.innerHTML = `Date displayed: ${displayTheDate}`

    let articles = await retrieveArticles(newsURL)
    let articlesToReturn = filterArticles(articles)
    console.log(articlesToReturn)
    
    displayArticles(articlesToReturn)
}



