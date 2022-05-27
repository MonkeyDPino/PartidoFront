import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { TextField } from "@mui/material";
import "./partidoCreate.css";

const getActualDate = () => {
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    return yourDate.toISOString().split("T")[0];
  };

function PartidoCreate() {
  const [values, setValues] = useState({
    fecha: getActualDate(),
    lugar: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

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
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {/* Botones */}
          <div className="btn-container">
            <div className="btn-login">
              <button>Crear Partido </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PartidoCreate;
