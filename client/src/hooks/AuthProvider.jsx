import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('site') || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        // TODO: see if we really need that user and if we need to return it from the API
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/");
      }
    } catch(error) {
      console.error(error);
    }
  }

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate('/login');
  }

  return  <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
    {children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
}
