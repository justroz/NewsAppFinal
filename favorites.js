let btnLogout = document.getElementById('btnLogout');
let articleDisplay = document.getElementById('articleDisplay')

let storesRef = database.ref('users')

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        usersRef.child(firebaseUser.uid).child('favorites').on('value',(snapshot) => {
            
            let articlesObject = snapshot.val()?snapshot.val():{}
            
            let articles = Object.keys(articlesObject).map(key => {
                let article = snapshot.val()[key]
                article['key'] = key
                return article
            })
            console.log(articles)
            displayFavoritedArticles(articles)
        })
    } else {
        console.log('not logged in')
    }
});

//This function displays the favorited articles
function displayFavoritedArticles(articles){
    if(articles.length < 1){
        return articleDisplay.innerHTML = `<div>You have not yet favorited any articles.</div>`
    }else if(articles.length >= 1) { 
        favoritedArticles = articles.map(article => {   
            console.log(article) 
            return `<div class="relevantArticles uk-card uk-card-default uk-card-hover uk-card-body">
                    <span>${article.headline ? article.headline : "Title Unknown"}</span>
                    <span>${article.byline}</span>
                    <span>${article.snippet ? article.snippet : "Snippet Unavailable"}</span>
                    <a target ="_blank" href="${article.articleURL}">${article.articleURL ? "Read Article": "#"}</a>
                    <span>${article.newsDesk ? article.newsDesk : "News Desk Unavailable"}</span>
                    <button id='${article._id}' onclick="deleteFavorite('${article.key}')">Delete</button>
                    </div>`  
        })
        articleDisplay.innerHTML = favoritedArticles.join("")
    }
    console.log("Favorited articles successfully displayed!")       
}

//Adds functionality to logout button
btnLogout.addEventListener('click', e => {
    auth.signOut()
    .then(() => {
        window.location.href = "login.html";
    })
    .catch(error => {
        console.log(error)
    })
});

//remove favorited article from list
function deleteFavorite (articleKey) {
    let uid= firebase.auth().currentUser.uid

    database.ref(`users/${uid}/favorites/${articleKey}`).remove()
}


 