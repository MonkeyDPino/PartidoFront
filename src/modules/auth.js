import axios from "axios"
import jwt_decode from "jwt-decode";
const backURI = "https://app-partido-back.herokuapp.com"

const handleLogin = (email, password) => {
  var data = JSON.stringify({
    correo: email,
    contrasena: password,
  });

  var config = {
    method: "post",
    url:  backURI+"/api/auth/login",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
  };

  return axios(config)
    .then((response) => {
      const tokenInfo = jwt_decode(response.data.accessToken)
      return {data: JSON.stringify(response.data),tokenInfo,accessToken: response.data.accessToken};
    })
    .catch(function (error) {
      return error.response.data;
    });
};

const handleRegister = (nombre,email,contrasena) => {
  var data = JSON.stringify({
    "nombre": nombre,
    "contrasena": contrasena,
    "correo": email
  });
  
  var config = {
    method: 'post',
    url:  backURI+'/api/auth/register',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return error.response.data;
  });
}

const validateToken = (token) => {
  const tokenInfo = jwt_decode(token)
  if(!tokenInfo.rol) return false;
  return true;
}

export {handleLogin,handleRegister,validateToken}