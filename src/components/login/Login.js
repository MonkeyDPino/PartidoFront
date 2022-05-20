import "./login.css";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Ventana de Login  HU_002

function Login() {
//   const [userLogin, changeLogin] = React.useState(false)
//   const [values, setValues] = React.useState({
//     email: "",
//     password: "",
//     showPassword: false,
//   });

//   const loginApp = (event) => {
//     console.log("Entrando")
//     logUser(values.email, values.password).then(log => {
//       if (log.response === "Ok") {
//         console.log("Ok:", log.response)
//         changeLogin(true)
//       } else {
//         console.log("Error:", log.response)
//         //CODIGO DE MODAL QUE MUESTRE MENSAJE AL USUARIO
//       }
//     })
//     event.preventDefault();
//   };

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   if (userLogin) {
    // return <Navigate to="/MisProyectos" />
//   } else {
    return (
      <>
        <div>
          <div>
            <div className="login-form-container">
              <div className="login-card">
                <br />
                <h4>Iniciar sesión</h4>
                <form>
                  <div className="input-container">
                    <TextField
                      id="login-email"
                      label="Correo electrónico:"
                      fullWidth
                      autoComplete="off"
                    //   onChange={}
                      margin="normal"
                    />
                  </div>

                  {/* Password input */}

                  <div className="password-container">
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        fullWidth
                        // onChange={}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                            >
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>

                  {/* Botones */}
                  <div className="btn-container">
                    <div className="btn-login">
                      <button> Iniciar sesión </button>
                    </div>
                    <div className="btnRegistro">
                      <button className="btn-Registro">
                        <Link to="/Registro"> Registrarse </Link>
                      </button>
                    </div>
                  </div>
                  <label>¿Olvidó su contraseña?</label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
//   }
}

export default Login;
