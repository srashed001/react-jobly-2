import logo from "./logo.svg";

import Routes from "./routes/Routes";
import NavBar from "./navbar/NavBar";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import JoblyApi from "./api/api";
import UserContext from "./Context/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useLocalStorage("token", null);
  const [currUser, setCurrUser] = useState(null);
  const [appIds, setAppIds] = useState([]);

  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        const res = await JoblyApi.verifyToken({ token });
        const username = res.error ? null : res.currentUser.username;
        if (username) {
          try {
            JoblyApi.token = token;
            const user = await JoblyApi.getUser(username);
            setCurrUser(user);
            setAppIds(user.applications);
          } catch (e) {
            console.log(e);
            setCurrUser(null);
          }
        }
      }

      setIsLoading(false);
    }
    setIsLoading(true);
    getCurrUser();
  }, [token, setAppIds]);

  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false, errors: e };
    }
  }

  async function signup(signupData) {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false, errors: e };
    }
  }

  async function logout() {
    setToken(null);
    setCurrUser(null);
  }

  async function apply(jobId) {
    try {
      const id = await JoblyApi.apply(currUser.username, jobId);
      setAppIds([...appIds, id]);
    } catch (e) {
      console.log(e);
    }
  }

  async function unApply(jobId) {
    try {
      const id = await JoblyApi.unApply(currUser.username, jobId);
      setAppIds(appIds.filter((appId) => appId !== id));
    } catch (e) {
      console.log(e);
    }
  }

  if (isLoading) return <p>Loading ...</p>;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currUser, setCurrUser, appIds, apply, unApply }}
      >
        <div className="App">
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
