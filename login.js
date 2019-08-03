const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');

let usersRef = database.ref('users')

function clearTxtBoxes() {
    txtEmail.value = ""
    txtPassword.value = ""
}

//Add login event
btnLogin.addEventListener('click', x => {
    //Get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    clearTxtBoxes();
    //Sign in
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise
    .then(() => {
        window.location.href = "home.html";
    })
    .catch(error => console.log(error.message));
    
})

//Add signup event
btnSignUp.addEventListener('click', x => {
    //Get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    clearTxtBoxes();
    //Sign in
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    promise
    .then((response) => {
        console.log(response)
        let uid = firebase.auth().currentUser.uid
        saveUser(uid)
        window.location.href = "home.html";
    })
    .catch(error => {
        alert(error.message)
    });
})

//Save user
function saveUser(uid) {
    // let user = new User(uid)
    usersRef.child(uid).set({
        uid: uid
    })
}

//User class
class User {
    constructor(uid) {
        this.userId = uid
        this.favorites = [] 
    }

    addFavorite(favorite) {
        this.favorites.push(favorite)
    }
}
