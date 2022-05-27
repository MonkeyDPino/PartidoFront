import "./login.css";
import {useState} from "react";
import {handleLogin} from "../../modules/auth"
import { Link, Navigate} from "react-router-dom";
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
  const [userLogin, changeLogin] = useState(null)
  const [errorMessage,setErrorMessage] = useState("")
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const loginApp = (event) => {
    event.preventDefault();
    console.log("Entrando")
    handleLogin(values.email, values.password).then((response) => {
      if (response.tokenInfo) {
        const tokenInfo = response.tokenInfo
        localStorage.setItem("rol", tokenInfo.rol);
        localStorage.setItem("id", tokenInfo.id);
        localStorage.setItem("exp", tokenInfo.exp);
        localStorage.setItem("accessToken", response.accessToken);
        window.logTimeout = setTimeout(() => {
          localStorage.removeItem("id");
          localStorage.removeItem("rol");
          localStorage.removeItem("exp");
          localStorage.removeItem("accessToken");
        }, tokenInfo.exp * 1000 - tokenInfo.iat * 1000);
        changeLogin(true)
      }else{
        changeLogin(false)
        setErrorMessage(response.error)
      }
    })
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showError = ()=> {
    if(userLogin === false && errorMessage){   
      return <div className="error">{errorMessage}</div>
    }
  }

  if (userLogin) {
    return <Navigate to="/dashboard" />
  } else {
    return (
      <div className="back-login">
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
                      label="Correo"
                      fullWidth
                      autoComplete="off"
                      onChange={handleChange("email")}
                      margin="normal"
                    />
                  </div>

                  {/* Password input */}

                  <div className="password-container">
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Contraseña
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        fullWidth
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                  {showError()}
                  {/* Botones */}
                  <div className="btn-container">
                    <div className="btn-login">
                      <button onClick={loginApp}> Iniciar sesión </button>
                    </div>
                      <button className="btn-registro" >
                        <Link to="/register">Registrarse</Link>
                      </button>
                  </div>
                  <label>¿Olvidó su contraseña?</label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
