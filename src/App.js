import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const gitHubProvider = new GithubAuthProvider();

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const faceBookProvider = new FacebookAuthProvider();

  const handleFacebookSignIn = () =>{
    signInWithPopup(auth, faceBookProvider)
    .then((result) => {
      const user = result.user;
      console.log(user)
      setUser(user)
    })
    .catch((error) =>{
      console.error(error)
    })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };

  return (
    <div className="App">
      {/* <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleGitHubSignIn}>GitHub Sign In</button>
      <button onClick={handleFacebookSignIn}>Facebook Login</button> */}
      {user?.uid ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGitHubSignIn}>GitHub Sign In</button>
          <button onClick={handleFacebookSignIn}>Facebook Login</button>
        </>
      )}
      <h2>Name : {user?.displayName}</h2>
      <p>I know your email address : {user?.email}</p>
      <img src={user?.photoURL} alt="" />
    </div>
  );
}

export default App;
