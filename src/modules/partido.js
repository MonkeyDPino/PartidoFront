import axios from "axios"
import {validateToken} from "./auth"

const getPartidos = () =>{
    const token = localStorage.getItem('accessToken')
    if(!validateToken(token))return{
        ok:false,
        error:"token inválido"
    }

    var config = {
        method: 'get',
        url: 'http://localhost:5000/api/partido',
        headers: { 
          'token': token
        }
      };
      
      return axios(config)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.response.data;
      });
}


export {getPartidos}