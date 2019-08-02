let articleDisplay = document.getElementById("articleDisplay")
let maxDay = document.getElementById("dateInput")
//let submitSearchButton = document.getElementById("submitSearchButton")
let dateInput = document.getElementById("dateInput")
let displayDate = document.getElementById("displayDate")
document.getElementById("submitForm").addEventListener("submit", submitFunction);
let sectionName = document.getElementById("sectionName")
let articleCount = document.getElementById("articleCount")


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







async function retrieveArticles (newsURL) {
    let response = await fetch(newsURL) //makes touch with the URL
    let json = await response.json() //access the data at the URL
    let articles = (Object.values(json)) //makes array of info in json
    console.log(articles)
    console.log("retrieve articles function successful")
    return articles

}

function filterArticles(articles) {
    console.log(dateInput.value)
    let articulos = articles[1].docs
    //console.log(sectionName.value)
    //let possibleSections = []
    let articleToReturn = articulos.filter(article => {
        //console.log(article.section_name)
        /*if(!possibleSections.includes(article.section_name)){
            possibleSections.push(article.section_name)
        }*/
        if(sectionName.value === "null"){
            return article.pub_date.slice(0, 10) === dateInput.value 
        }else{
        return (article.pub_date.slice(0, 10) === dateInput.value && article.section_name === sectionName.value)
        }
    })
    //console.log('sections   ', possibleSections)
    console.log(articleToReturn)
    console.log("filter articles function successful")
    return articleToReturn
}




function displayArticles(articlesToReturn){
    let countOfArticles = `<div>Your search returned ${articlesToReturn.length} articles.</div>`
    articleCount.innerHTML = countOfArticles
    if(articlesToReturn.length < 1){
        return articleDisplay.innerHTML = `<div class="noDataDiv">Sorry, your search did not return any articles.</div>`
        
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


        return `<div class="relevantArticles uk-card uk-card-default uk-card-hover uk-card-body">
        <h2>${article.headline.main ? article.headline.main : "Title Unknown"}</h2>
        <h4>${authorName}</h4>
        <p>${article.snippet ? article.snippet : "Snippet Unavailable"}</p>
        <a target ="_blank" href="${article.web_url}">${article.web_url ? "Read Article": "#"}</a>
        <p>${article.news_desk ? article.news_desk : "News Desk Unavailable"}</p>
        <span uk-icon="icon: heart"></span>

        </div>`  

        })
    }

    articleDisplay.innerHTML = searchedArticles.join("")
    console.log("display articles function successful")     
    
}

function monthInSearch(dateInput){
    let dateToSearch = dateInput.value.split("-");
    monthToSearch = dateToSearch[1];
    monthToSearch = parseInt(monthToSearch);
    return monthToSearch
}

function dayInSearch(dateInput){
    let dateToSearch = dateInput.value.split("-");
    dayToSearch = dateToSearch[2];
    return dayToSearch
}

function yearInSearch(dateInput){
    let dateToSearch = dateInput.value.split("-");
    yearToSearch = dateToSearch[0];
    return yearToSearch
}

function dateDisplay(monthToSearch, dayToSearch, yearToSearch){
let displayTheDate = monthToSearch + '/' + dayToSearch + '/' + yearToSearch
return displayTheDate
}

async function submitFunction() {
    event.preventDefault()

    let monthToSearch = monthInSearch(dateInput)
    let dayToSearch = dayInSearch(dateInput)
    let yearToSearch = yearInSearch(dateInput)

    
    let newsURL = `https://api.nytimes.com/svc/archive/v1/${yearToSearch}/${monthToSearch}.json?api-key=GFEciqybc9QEdFHWzX02J6O85EHFpJah`

    let displayTheDate = dateDisplay(monthToSearch, dayToSearch, yearToSearch)

    displayDate.innerHTML = displayTheDate

    let articles = await retrieveArticles(newsURL)
    let articlesToReturn = filterArticles(articles)
    console.log(articlesToReturn)
    
    displayArticles(articlesToReturn)




}


