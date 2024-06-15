import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
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
      if (res.jwtToken) {
        setToken(res.jwtToken);
        localStorage.setItem("site", res.jwtToken);
        navigate("/lists");
        return
      }
    } catch(error) {
      console.error(error);
    }
  }

  const logOut = () => {
    setToken("");
    localStorage.removeItem("site");
    navigate('/');
  }

  return ( <AuthContext.Provider value={{ token, loginAction, logOut }}>
          {children}
          </AuthContext.Provider>)
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
}
