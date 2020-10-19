import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const updateUser = () => {
    // setUserObj(authService.currentUser); // Doesn't re-render
    
    const user = authService.currentUser;
    // setUserObj(Object.assign({}, user)); // Object.assign() needs Target and Source
    
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  return (
    <>
      {init ? (
        <AppRouter isSignedIn={Boolean(userObj)} userObj={userObj} updateUser={updateUser} />
      ) : (
        "Initializing..." 
      )}
      <footer>&copy; Tweet {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;