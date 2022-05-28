import axios from "axios";

const getJugadores = (ids) => {
  const token = localStorage.getItem("accessToken");

  var data = {
    ids: ids,
  };

  var config = {
    method: "patch",
    url: "http://localhost:5000/api/jugador/jugadores",
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

const getJugadoresNotIn = (ids) => {
  const token = localStorage.getItem("accessToken");

  var data = {
    ids: ids,
  };

  var config = {
    method: "delete",
    url: "http://localhost:5000/api/jugador/jugadores",
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

const getEquipos = (equipoA,equipoB) => {
  const token = localStorage.getItem("accessToken");

  var data = {
    equipoA: equipoA,
    equipoB: equipoB
  };

  var config = {
    method: "patch",
    url: "http://localhost:5000/api/jugador/jugadores",
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

const calificar = (idPartido,calificacion,idJugador,idCalificador,comentario) =>{
  const token = localStorage.getItem("accessToken");
  var data = JSON.stringify({
    "idPartido": idPartido,
    "calificacion": calificacion,
    "idJugador": idJugador,
    "idCalificador": idCalificador,
    "comentario": comentario?comentario:""
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:5000/api/partido/calificaciones',
    headers: { 
      'token': token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });
}

export { getJugadores,getJugadoresNotIn,getEquipos,calificar };
