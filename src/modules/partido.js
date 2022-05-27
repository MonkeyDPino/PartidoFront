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

  var data = JSON.stringify({
    id: id,
  });

  var config = {
    method: "post",
    url: "http://localhost:5000/api/partido/lista",
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

const deleteDeLista = (idPartido, idJugador) => {
  const token = localStorage.getItem("accessToken");

  var data = JSON.stringify({
    id: idPartido,
  });

  var config = {
    method: "delete",
    url: "http://localhost:5000/api/partido/lista/" + idJugador,
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

const AddaLista = (idPartido, idJugador) => {
  const token = localStorage.getItem("accessToken");

  var data = JSON.stringify({
    id: idPartido,
  });

  var config = {
    method: "patch",
    url: "http://localhost:5000/api/partido/lista/" + idJugador,
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

const GenEquipos = (idPartido, Criterio, Algoritmo) => {
  const token = localStorage.getItem("accessToken");

  var data = JSON.stringify({
    id: idPartido,
    criterio: Criterio,
    algoritmo: Algoritmo,
  });

  var config = {
    method: "post",
    url: "http://localhost:5000/api/partido/equipos",
    headers: {
      token: token,
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

const cancelPartido= (idPartido) =>{
  const token = localStorage.getItem("accessToken");

  var data = JSON.stringify({
    "id": idPartido
  });
  
  var config = {
    method: 'delete',
    url: 'http://localhost:5000/api/partido',
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

const confirmPartido= (idPartido) =>{
  const token = localStorage.getItem("accessToken");

  var data = JSON.stringify({
    "id": idPartido
  });
  
  var config = {
    method: 'patch',
    url: 'http://localhost:5000/api/partido/confirmar',
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

const createPartido= (fecha,lugar) =>{
  const token = localStorage.getItem("accessToken");

  var data = JSON.stringify({
    "fecha": fecha,
    "lugar": lugar
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:5000/api/partido',
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

const getPartidosJug = (idJugador)=>{
  const token = localStorage.getItem("accessToken");

  var config = {
    method: 'get',
    url: 'http://localhost:5000/api/partido/partido/'+idJugador,
    headers: { 
      'token': token,
      'Content-Type': 'application/json'
    }
  };
  
  return axios(config)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return error.response.data
  });
}

export {
  getPartidos,
  addDato,
  deleteDato,
  createLista,
  deleteDeLista,
  AddaLista,
  GenEquipos,
  cancelPartido,
  confirmPartido,
  createPartido,
  getPartidosJug
};
