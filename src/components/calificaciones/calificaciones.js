import { useEffect, useState } from "react";
import { getPartidosJug } from "../../modules/partido";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { calificar } from "../../modules/jugador";
import "./calificaciones.css";
function Calificaciones() {
  const [partidos, setPartidos] = useState([]);
  const [errorGet, setErrorGet] = useState(null);
  const [errorCal, setErrorCal] = useState(null);
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInfo = () => {
    const id = localStorage.getItem("id");
    getPartidosJug(id)
      .then((res) => {
        if (!res.error && Array.isArray(res)) {
          setPartidos(res);
          if (errorGet) setErrorGet(false);
        } else {
          if (!errorGet) setErrorGet(true);
          if (res.error === "token is not valid") navigate("/login");
        }
      })
      .catch((err) => {
        if (!errorGet) setErrorGet(true);
        if (err.error === "token is not valid") navigate("/login");
        console.log(err);
      });
  };

  const handleChange = (event, idJugador) => {
    if (
      event.target.name === "calificacion" &&
      (event.target.value < 0 || event.target.value > 10)
    )
      return;
    let filter = {};
    if (values[idJugador]) filter = values[idJugador];
    filter[event.target.name] = event.target.value;
    setValues({ ...values, [idJugador]: filter });
  };

  const handleCalificar = (idPartido, idJugador) => {
    const id = localStorage.getItem("id");
    if (!values[idJugador]) {
      setErrorCal(true);
      return;
    }
    calificar(
      idPartido,
      values[idJugador]["calificacion"],
      idJugador,
      id,
      values[idJugador]["comentario"]
    )
      .then((response) => {
        if (response._id) {
          getInfo();
          setErrorCal(false);
        } else {
          if (response.error === "token is not valid") navigate("/login");
          console.log("Error", response);
          setErrorCal(true);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.error === "token is not valid") navigate("/login");
        setErrorCal(true);
      });
  };

  const showErrorCal = () => {
    if (errorCal) {
      return <div className="error">Error al calificar jugador</div>;
    }
  };

  if (errorGet) {
    return (
      <div>
        <div className="error">Error al Conseguir Calificaciones</div>
      </div>
    );
  }

  if (partidos.length <= 0) {
    return (
      <div>
        <h2>Calificaciones</h2>
        <div className="alert-box warning">
          <span>Advertencia: </span>no tienes calificaciones pendientes
        </div>
      </div>
    );
  } else {
    return (
      <div className="caliContainer">
        <h2>Calificaciones</h2>
        {showErrorCal()}
        <div className="caliPart">
          {partidos.map((document) => (
            <div className="caliCard" key={document.partido._id}>
              <div className="dataShow">
                <h4 className="dataField">Partido</h4>
                <h4 className="dataField">
                  {"Fecha:\t" + document.partido.fecha}
                </h4>
                <h4 className="dataField">
                  {"Lugar:" + document.partido.lugar}
                </h4>
                <h4 className="dataField">
                  {"Estado:" + document.partido.estado}
                </h4>
              </div>
              <div className="InputsContainer">
                {document.jugadores.map((user) => (
                  <div className="caliInputsContainer" key={user._id}>
                    <div className="dataShow">
                      <h6 className="dataField-head">Calificar</h6>
                      <h6 className="dataField">{"Nombre:\t" + user.nombre}</h6>
                      <h6 className="dataField">{"Correo:" + user.correo}</h6>
                      <h6 className="dataField">
                        {"Promedio Global:" + user.promedioGlobal.toFixed(2)}
                      </h6>
                    </div>
                    <div className="caliInputs">
                      <TextField
                        className="TextField"
                        label="Calificación"
                        type="number"
                        name="calificacion"
                        value={
                          values[user._id] && values[user._id]["calificacion"]
                            ? values[user._id]["calificacion"]
                            : ""
                        }
                        onChange={(e) => handleChange(e, user._id)}
                      />
                      <TextField
                        className="TextField"
                        label="Comentario"
                        name="comentario"
                        onChange={(e) => handleChange(e, user._id)}
                        value={
                          values[user._id] && values[user._id]["comentario"]
                            ? values[user._id]["comentario"]
                            : ""
                        }
                        multiline
                        rows={2}
                      />
                    </div>
                    <div className="btn-datos">
                      <button
                        onClick={() =>
                          handleCalificar(document.partido._id, user._id)
                        }
                      >
                        {" "}
                        Calificar{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Calificaciones;
