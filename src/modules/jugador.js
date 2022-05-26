import axios from "axios";
import { validateToken } from "./auth";

const getJugadores = (ids) => {
  const token = localStorage.getItem("accessToken");
  if (!validateToken(token))
    return {
      ok: false,
      error: "token inválido",
    };

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
  if (!validateToken(token))
    return {
      ok: false,
      error: "token inválido",
    };

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

export { getJugadores,getJugadoresNotIn };
