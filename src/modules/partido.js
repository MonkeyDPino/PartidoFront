import axios from "axios";
import { validateToken } from "./auth";

const getPartidos = () => {
  const token = localStorage.getItem("accessToken");
  if (!validateToken(token))
    return {
      ok: false,
      error: "token inválido",
    };

  var config = {
    method: "get",
    url: "http://localhost:5000/api/partido",
    headers: {
      token: token,
    },
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};

const addDato = (llave, valor, id) => {
  const token = localStorage.getItem("accessToken");
  if (!validateToken(token))
    return {
      ok: false,
      error: "token inválido",
    };
  var data = JSON.stringify({
    id: id,
    llave: llave,
    valor: valor,
  });
  var config = {
    method: "post",
    url: "http://localhost:5000/api/partido/dato",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};

const deleteDato = (idPartido, idDatos) => {
  const token = localStorage.getItem("accessToken");
  if (!validateToken(token))
    return {
      ok: false,
      error: "token inválido",
    };

  var data = JSON.stringify({
    id: idPartido,
    idDatos: idDatos,
  });

  var config = {
    method: "delete",
    url: "http://localhost:5000/api/partido/dato",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.response.data);
      return error.response.data;
    });
};

const createLista = (id) => {
  const token = localStorage.getItem("accessToken");
  if (!validateToken(token))
    return {
      ok: false,
      error: "token inválido",
    };

  var data = JSON.stringify({
    id: id,
  });

  var config = {
    method: "post",
    url: "http://localhost:5000/api/partido/lista",
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTg5MTNkYmEwMzI5M2EzMGU3NGQwMyIsInJvbCI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE2NTM1MTMyMDIsImV4cCI6MTY1MzU5OTYwMn0.VkitWASgG1_dXcg_VQL-_m1spSlp1rtCi_-IxtndPzM",
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error.response.data
    });
};

const deleteDeLista =(idPartido,idJugador)=>{
  const token = localStorage.getItem("accessToken");
  if (!validateToken(token))
    return {
      ok: false,
      error: "token inválido",
    };

  var data = JSON.stringify({
    "id": idPartido
  });
  
  var config = {
    method: 'delete',
    url: 'http://localhost:5000/api/partido/lista/'+idJugador,
    headers: { 
      'token': token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return error.response.data
  });
}
export { getPartidos, addDato, deleteDato, createLista,deleteDeLista };
