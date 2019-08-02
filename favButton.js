const btnLogout = document.getElementById('btnLogout');
const btnFavorite = document.getElementById('btnFavorite')

let usersRef = database.ref('users')

btnLogout.addEventListener('click', e => {
    auth.signOut()
    .then(() => {
        window.location.href = "login.html";
    })
    .catch(error => {
        console.log(error)
    })
});

let favorites = []

function changeColor() {
    let heartColor = document.getElementById('btnFavorite').style.color;
    if (heartColor == "red") {
        document.getElementById('btnFavorite').style.color = "gray"
    } else {
        document.getElementById('btnFavorite').style.color = "red"
    }
}
let favoriteRef = null

btnFavorite.addEventListener('click', function(){
    let headline = 
    let byline =
    let snippet =
    let newsDesk =
    let articleURL = 

    let favorite = new Favorite(headline, byline, snippet, newsDesk, articleURL)  
    if(btnFavorite.style.color == "red") {
        database.ref(`users/${uid}/favorites/${this.className}`).remove()
    } else {
        favoriteRef = usersRef.child(user.uid).child("favorites").push(favorite)
        btnFavorite.className = favoriteRef.getKey()
    }
    changeColor()
})

class Favorite {
    constructor(headline, byline, snippet, newsDesk, articleURL) {
        this.headline = headline 
        this.byline = byline 
        this.snippet = snippet
        this.newsDesk = newsDesk
        this.articleURL = articleURL 
    }
}