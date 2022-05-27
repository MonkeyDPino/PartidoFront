import { useEffect, useState } from "react";
import { getPartidosJug } from "../../modules/partido";
import { getJugadores } from "../../modules/jugador";
import { useNavigate } from "react-router-dom";

function Calificaciones() {
  const [partidos, setPartidos] = useState([]);
  const [errorGet, setErrorGet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const id = localStorage.getItem("id");

    const id = "6271dbd2fe61a318caa68a28";
    getPartidosJug(id)
      .then((res) => {
        if (!res.error && Array.isArray(res)) {
          getPlayers(res, id);
          if (errorGet) setErrorGet(false);
        } else {
          setErrorGet(true);
          if (res.error === "token is not valid") navigate("/login");
        }
      })
      .catch((err) => {
        setErrorGet(true);
        if (err.error === "token is not valid") navigate("/login");
        console.log(err);
      });
  }, []);

  const getPlayers = (partidos, idJugador) => {
    const idPlayers = [];
    const partidoIds = {};
    partidos.map((part) => {
      let idPlayersPartidos = [];
      part.lista.map((user) => {
        if (user.id != idJugador && !idPlayers.includes(user.id))
          idPlayers.push(user.id);
        idPlayersPartidos.push(user.id);
      });
      partidoIds[part._id] = idPlayersPartidos;
    });
    console.log(partidoIds);
    for (const item in partidoIds) {
      console.log(item);
    }

    getJugadores(idPlayers)
      .then((response) => {
        if (response.error === "token is not valid") navigate("/login");
        if (!response.error && Array.isArray(response)) {
          let partidoArray = [];
          partidos.map((partido) => {
            let jugadoresPartido = [];
            response.map((jugador) => {
                if(!partidoIds[partido._id].includes(jugador._id)) return
                let BOOL = true
                //REVISAR SI EL JUGADOR YA HA SIDO CALIDICADO ANTERIORMENTE POR MI JUGADOR EN ESE MISMO PARTIDO
                jugador.calificaciones.map(cal =>{
                    if(cal.idPartido == partido._id && cal.idJugador == idJugador){
                        BOOL=false
                    }
                    return
                })
              if (BOOL)
                jugadoresPartido.push(jugador);
            });
            // partidoArray.push({
            //     partido:
            // })
          })
          setErrorGet(false);
        } else {
          setErrorGet(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.error === "token is not valid") navigate("/login");
        setErrorGet(true);
      });
  };

  return <div className="calificacionesContainer"></div>;
}

export default Calificaciones;
