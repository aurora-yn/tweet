import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isSignedIn, setIsSignedIn ] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true)
      } else {
        setIsSignedIn(false)
      }
      setInit(true)
    })
  }, [])
  return (
    <>
      {init ? (<AppRouter isSignedIn={isSignedIn} />) : "Initializing" }
      
      <footer>&copy; Tweet {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;