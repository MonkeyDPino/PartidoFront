import { getMisCalis } from "../../modules/jugador";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./misCalificaciones.css";

function MisCalificaciones() {
  const navigate = useNavigate();
  const [calis, setCalis] = useState([]);
  const [errorGet, setErrorGet] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");

    console.log(id);
    getMisCalis(id)
      .then((res) => {
        if (!res.error && Array.isArray(res)) {
          res = res.map((cal) => {
            let date = new Date(cal.cali.fecha);
            date = date.toLocaleString("en-US");

            cal.cali.fecha = date;
            return cal;
          });
          setCalis(res);
          console.log(res);
          if (errorGet) setErrorGet(false);
        } else {
          console.log(res);
          if (!errorGet) setErrorGet(true);
          if (res.error === "token is not valid") navigate("/login");
        }
      })
      .catch((err) => {
        if (!errorGet) setErrorGet(true);
        if (err.error === "token is not valid") navigate("/login");
        console.log(err);
      });
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorGet) {
    return (
      <div>
        <div className="error">Error al Conseguir Calificaciones</div>
      </div>
    );
  }

  if (calis.length <= 0) {
    return (
      <div>
        <h2>Tus Calificaciones</h2>
        <div className="alert-box warning">
          <span>Advertencia: </span>no tienes calificaciones
        </div>
      </div>
    );
  }

  return (
    <div className="misCalisContainer">
      <h4>Tus Calificaciones</h4>
      <div className="flexCalis">
        {calis.map((cal) => (
          <div className="miscalisCard" key = {cal.cali._id}>
            <div className="miscalisDataShow">
              <label className="miscalisHead">
                {"El jugador " +
                  cal.jugador.nombre +
                  " con correo " +
                  cal.jugador.correo +
                  " te ha calificado el dia " +
                  cal.cali.fecha +
                  ":"}
              </label>
              <label className="miscalisData">{"Nota: " + cal.cali.num}</label>
              {cal.cali.comentario !== "" ? (
                <label className="miscalisData">
                  {"Comentario: " + cal.cali.comentario}
                </label>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisCalificaciones;
