import { useState } from "react";
import { TextField } from "@mui/material";
import { createPartido } from "../../modules/partido"
import { useNavigate } from "react-router-dom";
import "./partidoCreate.css";

const getActualDate = () => {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    return yourDate.toISOString().split("T")[0];
  };

function PartidoCreate() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fecha: getActualDate(),
    lugar: "",
  });
  const [errorCreate, setErrorCreate] = useState(null);
  const [errorDate, setErrorDate] = useState(null);
  const [loadings, setLoadings] = useState(null);

  const handleChange = (event) => {
    if( event.target.name === "fecha" && !(new Date(event.target.value) >= new Date(getActualDate()))){
      setErrorDate(true)
      return
    }
    if(errorDate)setErrorDate(false)
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const showErrorCreate = () => {
    if (errorCreate) {
      return <div className="error">Error al crear el partido (solo puede haber un partido en juego)</div>;
    }
  };

  const showErrorDate = () => {
    if (errorDate) {
      return <div className="error">La fecha debe ser hoy o algún día despues</div>;
    }
  };

  const handleCreate = (event) =>{
    event.preventDefault();
    setLoadings(true)
    createPartido(values.fecha,values.lugar)
    .then((res) => {
      if (res.partido) {
        navigate("/dashboard");
      } else {
        setErrorCreate(true);
        if (res.error === "token is not valid") navigate("/login");
      }
      setLoadings(false)
    })
    .catch((err) => {
      setErrorCreate(true);
      if (err.error === "token is not valid") navigate("/login");
      setLoadings(false)
    });
  }

  return (
    <div className="create-form-container">
      <div className="create-card">
        <br />
        <h4>Crear Partido</h4>
        <form>
          <div className="input-container">
            <TextField
              label="Lugar"
              name="lugar"
              fullWidth
              autoComplete="off"
              onChange={handleChange}
              margin="normal"
            />
          </div>
          <div className="input-container">
            <TextField
              name="fecha"
              label="Fecha"
              type="date"
              value={values.fecha}
              onChange={handleChange}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {showErrorDate()}
          {showErrorCreate()}
          {/* Botones */}
          <div className="btn-container">
            <div className="btn-login">
              {!loadings? <button onClick={handleCreate}>Crear Partido </button>:<></>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PartidoCreate;
