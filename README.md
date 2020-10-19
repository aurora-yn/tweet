# Tweet using firebase
Realtime upload, update and delete adding a photo using firebase database and storage

---

# Set up
- **.env**: to hide the key from Github
- **jsconfig.json**: to set non-relative path
- **react-route-dom**:  npm i react-route-dom
- **FileReader API**
- **uuid**: npm i uuid
```
import { v4 as uuidv4 } from "uuid";
```

---

# Firebase
## 1. firebase.auth()

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

## 2. firebase.firestore()
- firebase.collection("collection").**get**()
This get retuen **QuerySnapShot** which has docs, empty, metadata, query, size as properties.
For method, it has docChanges, forEach, isEqual.
```
const dbTweets = await firebase.firestore.collection("tweets").get();
dbTweets.forEach((document) => console.log(document.data()));
```

- firebase.collection("collection").**onSnapshot**((snapshot => {( ... )}))
Used this under *useEffect*
```
firebase.firestore.collection("collection").onSnapshot((snapshot) => {
  const dataArray = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
setData(dataArray);
```

- firebase.firestore.doc(`collection/${object.id}`).delete()
- firebase.firestore.doc(`collection/${object.id}`).update({ content: newContent })

## 3. firebase.storage()
- [firebase.storage.ref()](https://firebase.google.com/docs/reference/js/firebase.storage.Reference?authuser=1)
- Reference
   - putString
   - getDownloadURL
   - refFromURL

## 4. firebase.user
- [firebase.user](https://firebase.google.com/docs/reference/js/firebase.User?authuser=1)



---



# React-dom-router
- **Redirect**
- **useHistory**s
```
const history = useHistory();
history.push("/");
```


---

# Get files
- FileReader API
```
const {
  target: { files },
} = event;
const theFile = files[0];
const reader = new FileReader();
reader.readAsDataURL(theFile);
```


