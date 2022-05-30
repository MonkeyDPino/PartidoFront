import axios from "axios";
const backURI = "https://app-partido-back.herokuapp.com"

const getJugadores = (ids) => {
  const token = localStorage.getItem("accessToken");

  var data = {
    ids: ids,
  };

  var config = {
    method: "patch",
    url: backURI+"/api/jugador/jugadores",
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
    url: backURI+"/api/jugador/jugadores",
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

const getEquipos = (equipoA, equipoB) => {
  const token = localStorage.getItem("accessToken");

  var data = {
    equipoA: equipoA,
    equipoB: equipoB,
  };

  var config = {
    method: "patch",
    url: backURI+"/api/jugador/jugadores",
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

const calificar = (
  idPartido,
  calificacion,
  idJugador,
  idCalificador,
  comentario
) => {
  const token = localStorage.getItem("accessToken");
  var data = JSON.stringify({
    idPartido: idPartido,
    calificacion: calificacion,
    idJugador: idJugador,
    idCalificador: idCalificador,
    comentario: comentario ? comentario : "",
  });

  var config = {
    method: "post",
    url: backURI+"/api/partido/calificaciones",
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

const darseBaja = (idJugador, idSuplente, idPartido) => {
  const token = localStorage.getItem("accessToken");
  var data = JSON.stringify({
    id: idPartido,
    suplenteId: idSuplente === "" ? null : idSuplente,
  });

  var config = {
    method: "delete",
    url: backURI+"/api/jugador/partido?id=" + idJugador,
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

const getMisCalis = (idJugador) =>{
  const token = localStorage.getItem("accessToken");

  var config = {
    method: 'get',
    url: backURI+'/api/partido/calificaciones?id='+idJugador,
    headers: { 
      'token': token
    }
  };
  
  return axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data
  });

}

export { getMisCalis,getJugadores, getJugadoresNotIn, getEquipos, calificar, darseBaja };
