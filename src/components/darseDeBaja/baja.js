import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { getPartidosBaja } from "../../modules/partido";
import { darseBaja } from "../../modules/jugador";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import "./baja.css";

function Baja() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [suplente, setSuplente] = useState("");
  const [errorGet, setErrorGet] = useState(null);
  const [errorBaja, setErrorBaja] = useState(null);
  const [noPartidos, setNoPartidos] = useState(null);
  const [loadings, setLoadings] = useState(null);

  const handleSuplente = (event) => {
    setSuplente(event.target.value);
  };

  const handleBaja = () => {
    const id = localStorage.getItem("id");
    setLoadings(true);
    darseBaja(id, suplente, values.partido._id)
      .then((res) => {
        if (!res.error && res.partidoActualizado) {
          navigate("/");
          if (errorBaja) setErrorBaja(false);
        } else {
          console.log(res);
          if (!errorBaja)
          setErrorBaja(true);
          if (res.error === "token is not valid") navigate("/login");
        }
        setLoadings(false);
      })
      .catch((err) => {
        if (!errorBaja) setErrorBaja(true);
        if (err.error === "token is not valid") navigate("/login");
        console.log(err);
        setLoadings(false);
      });
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    getPartidosBaja(id)
      .then((res) => {
        if (!res.error && res.jugadores) {
          setValues(res);
          if (errorGet) setErrorGet(false);
        } else {
          console.log(res);
          if (res.error === "no hay partidos para darse de baja")
            setNoPartidos(true);
          if (!errorGet && res.error !== "no hay partidos para darse de baja")
            setErrorGet(true);
          if (res.error === "token is not valid") navigate("/login");
        }
      })
      .catch((err) => {
        if (!errorGet) setErrorGet(true);
        if (err.error === "token is not valid") navigate("/login");
        console.log(err);
      });
  });

  if (errorGet) {
    return (
      <div>
        <div className="error">Error al Conseguir partidos</div>
      </div>
    );
  }
  if (noPartidos) {
    return (
      <div>
        <h2>Darse de Baja</h2>
        <div className="alert-box warning">
          <span>Advertencia: </span>no estas convocado en ningún partido
        </div>
      </div>
    );
  }

  const showErrorbaja = () => {
    if (errorBaja) {
      return <div className="error">Error al darse de baja</div>;
    }
  };

  //todo CAMBIAR LISTA TAMBIÉN EN LA PETICIÓN

  return (
    <div className="create-form-container">
      <div className="create-card">
        <br />
        <h4>Darse de baja de un partido</h4>
        <form>
          {values.partido ? (
            <div className="dataShow">
              <label className="dataField">Partido</label>
              <br></br>
              <label className="dataField">
                {"Fecha:\t" + values.partido.fecha}
              </label>
              <br></br>
              <label className="dataField">
                {"Lugar: " + values.partido.lugar}
              </label>
            </div>
          ) : (
            <></>
          )}
          <div className="input-container">
            <FormControl>
              <InputLabel>Suplente</InputLabel>
              <Select
                label="Algoritmo"
                name="suplente"
                value={suplente}
                onChange={handleSuplente}
              >
                {values.jugadores ? (
                  values.jugadores.map((user) => (
                    <MenuItem value={user._id} key={user._id}>
                      {"Nombre: " + user.nombre + " Correo: " + user.correo}
                    </MenuItem>
                  ))
                ) : (
                    <MenuItem value={""}>
                  </MenuItem>
                )}
              </Select>
              <FormHelperText>Escoger suplente</FormHelperText>
            </FormControl>
          </div>
          {showErrorbaja()}
          {/* Botones */}
          <div className="btn-container">
            <div className="btn-login">
              {!loadings ? <button onClick={handleBaja}>Darse de baja</button> : <></>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Baja;
