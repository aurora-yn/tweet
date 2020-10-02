Tweet with firebase

---

# Set up
- **.env**: to hide the key from Github
- **jsconfig.json**: to set non-relative path
- npm i react-route-dom

# Firebase
## firebase.auth()

- [onAuthStateChanged()](https://firebase.google.com/docs/auth/web/manage-users?authuser=1)

The recommended way to get the current user is by setting an observer on the Auth object:
```
firebase.auth().onAuthStateChanged((user) => {

})
```
Inside useEffect, and then update useState

- [firebase.auth.GoogleAuthProvider()](https://firebase.google.com/docs/auth/web/google-signin?authuser=1)
Needs provider
```
let provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider)
```

- firebase.collection("collection").get()
This get retuen **QuerySnapShot** which has docs, empty, metadata, query, size as properties.
For method, it has docChanges, forEach, isEqual.
```
const dbTweets = await dbService.collection("tweets").get();
dbTweets.forEach((document) => console.log(document.data()));
```

# React-dom-router
- **Redirect**
- **useHistory**s
```
const history = useHistory();
history.push("/");
```