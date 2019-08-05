let btnFavorite = document.getElementById('btnFavorite')

let usersRef = database.ref('users')

let favorites = []

function changeColor(articleId) {
    let heartButton = document.getElementById(articleId);
    if (heartButton.style.color == "red") {
        heartButton.style.color = "gray"
    } else {
        heartButton.style.color = "red"
    }
}
let favoriteRef = null

function favoriteClicked (headline, byline, snippet, newsDesk, articleURL, articleId) { 
    let uid= firebase.auth().currentUser.uid
    let favorite = new Favorite(headline, byline, snippet, newsDesk, articleURL)
    let heartButton = document.getElementById(articleId);
    if(heartButton.style.color == "red") {
        database.ref(`users/${uid}/favorites/${heartButton.className}`).remove()
    } else {
        favoriteRef = usersRef.child(uid).child("favorites").push(favorite)
        heartButton.className = favoriteRef.getKey()
    }
    changeColor(articleId)
}


class Favorite {
    constructor(headline, byline, snippet, newsDesk, articleURL) {
        this.headline = headline 
        this.byline = byline 
        this.snippet = snippet
        this.newsDesk = newsDesk
        this.articleURL = articleURL 
    }
}
