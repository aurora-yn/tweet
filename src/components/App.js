import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isSignedIn, setIsSignedIn ] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
        setUserObj(user);
      } else {
        setIsSignedIn(false);
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (<AppRouter isSignedIn={isSignedIn} userObj={userObj} />) : "Initializing" }
      
      <footer>&copy; Tweet {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;