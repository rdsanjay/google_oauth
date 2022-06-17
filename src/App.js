import "./App.css";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  const handleCredentialResponse = (res) => {
    console.log("jwt", res.credential);
    let userObject = jwtDecode(res.credential);
    console.log("userObject", userObject);
    setUser(userObject);
    document.getElementById("buttonDiv").hidden = true;
  };
  useEffect(() => {
    const google = window.google;
    google.accounts.id.initialize({
      client_id:
        "5136112858-qievu47pe0cii1uve6dh8gjbcjfb7bvs.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  const handleLogout = () => {
    setUser({});
    document.getElementById("buttonDiv").hidden = false;
  };
  return (
    <div className="App">
      <div id="buttonDiv"></div>
      {user && (
        <div>
          <img src={user.picture} alt="" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
