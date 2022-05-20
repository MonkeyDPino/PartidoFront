import {createContext,useState} from "react"
import axios from "axios"
import jwt from 'jsonwebtoken'
const AuthContext = createContext(null)

function AuthProvider ({children}) {
    const [token,setToken] = useState(null)

    const handleLogin = (email, password) => {
      var data = JSON.stringify({
        correo: email,
        contrasena: password,
      });

      var config = {
        method: "post",
        url: "http://localhost:5000/api/auth/login",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: data,
      };

      return axios(config)
        .then(function (response) {
          response = JSON.stringify(response.data);
          const tokenInfo = jwt.decode(response.token, "partido")
          console.log(tokenInfo)
          Aqui Voy
          return response;
        })
        .catch(function (error) {
          return error.response.data;
        });
    };
    const value = {
        token,
        onLogin: handleLogin,
      };

    return (<AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider> );
}

export {AuthProvider,AuthContext} ;