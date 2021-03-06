import { Paper, TextField } from "@mui/material";
import React from "react";
import {handleRegister} from "../../modules/auth"
import {Navigate} from "react-router-dom";
import "./register.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


// H1 Registro

function Registro() {

  const [values, setValues] = React.useState({
      nombre:"",
      email:"",
      contrasena:""
  });
  const [showPassword,setShowPassword] = React.useState(false)
  const [registered,setRegistered] = React.useState(false)
  const [regError,setRegError] = React.useState(false)

  const handleChange =(event) => {
      console.log(event.target.value)
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const registrarUser = () => {
    handleRegister(values.nombre,values.email,values.contrasena)
    .then((response) => {
      if (response._id) {
        setRegistered(true)
      } else {
        console.log("Error", response);
        setRegError(true);
      }
    })
    .catch((error) => {
      console.log("Error", error);
      setRegError(true);
    });
  }

  const showErrorReg = () => {
    if (regError) {
      return <div className="error">Error al registrarse</div>;
    }
  };

  if (registered) {
      return <Navigate to="/login" />
  } else {
    return (
      <div className="contenedor-registro">
        <Paper className="form-registro">
          <h1>Formulario de Registro</h1>
          <TextField
            name="nombre"
            label="Ingrese su nombre:"
            fullWidth
            value={values.nombre}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="email"
            label="Ingrese su correo:"
            fullWidth
            value={values.email}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl margin="normal" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Contrase??a
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="contrasena"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={values.contrasena ? values.contrasena : ""}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {showErrorReg()}
          <div className="btn-registrarse">
            <button onClick={registrarUser}>Registrarse</button>
          </div>
        </Paper>
      </div>
    );
  }

  
}

export default Registro;
