import axios from "axios"
import jwt from "jsonwebtoken"

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
    .then((response) => {
      const tokenInfo = jwt.decode(response.data.accessToken, "partido")
      return {data: JSON.stringify(response.data),tokenInfo,accessToken: response.data.accessToken};
    })
    .catch(function (error) {
      return error.response.data;
    });
};
export default handleLogin