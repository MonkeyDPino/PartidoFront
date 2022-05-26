import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import { GenEquipos } from "../../modules/partido";
import { getEquipos } from "../../modules/jugador";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./partidoEquipos.css";

function PartidoEquipos({ partido, setPartido}) {
  const navigate = useNavigate();
  const [equipos, SetEquipos] = useState({
    equipoA: [],
    equipoB: [],
  });
  const [values, setValues] = useState({
    criterio: "",
    algoritmo: "",
  });
  const [errorGenerate, setErrorGenerate] = useState(null);
  const [errorGetting, setErrorGetting] = useState(null);

  useEffect(() => {
    if (
      partido.equipoA &&
      partido.equipoB &&
      partido.equipoA.length > 0 &&
      partido.equipoB.length > 0
    ) {
      const equipoA = [];
      const equipoB = [];
      partido.equipoA.map((user) => {
        equipoA.push(user.id);
        return user;
      });
      partido.equipoB.map((user) => {
        equipoB.push(user.id);
        return user;
      });
      getEquipos(equipoA, equipoB)
        .then((response) => {
          if (response.error === "token is not valid") navigate("/login");
          if (
            !response.error &&
            typeof response != "string" &&
            response.equipoB &&
            response.equipoA
          ) {
            SetEquipos(response);
            setErrorGetting(false);
          } else {
            setErrorGetting(true);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.error === "token is not valid") navigate("/login");
          setErrorGetting(true);
        });
    } else {
      SetEquipos({
        equipoA: [],
        equipoB: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partido]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleGenerate = () => {
    GenEquipos(partido._id, values.criterio, values.algoritmo)
      .then((response) => {
        if (response._id) {
          console.log(response);
          setPartido(response);
          setErrorGenerate(false);
        } else {
          if (response.error === "token is not valid") navigate("/login");
          console.log("Error", response);
          setErrorGenerate(true);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.error === "token is not valid") navigate("/login");
        setErrorGenerate(true);
      });
  };

  const showErrorGenerate = () => {
    if (errorGenerate) {
      return <div className="error">Error al generar equipos</div>;
    }
  };

  const showEquipo = (equipoArray) => {
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Correo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipoArray.map((user) => (
              <TableRow
                className="lista-Row"
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{user.correo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  if (errorGetting) {
    return (
      <div className="partidoLista-container">
        <div className="error">Error al conseguir los equipos</div>
      </div>
    );
  }

  if (
    equipos.equipoA.length <= 0 &&
    equipos.equipoB.length <= 0 &&
    partido._id
  ) {
    return (
      <div className="partidosContainer">
        <h4>Generar equipos del partido</h4>
        {showErrorGenerate()}
        <div className="dataInput">
          <FormControl>
            <InputLabel>Criterio</InputLabel>
            <Select
              label="Criterio"
              name="criterio"
              value={values.criterio}
              onChange={handleChange}
            >
              <MenuItem value={"promedioGlobal"}>Promedio Global</MenuItem>
              <MenuItem value={"promedioLastMatch"}>
                Promedio Ultimo Partido
              </MenuItem>
            </Select>
            <FormHelperText>Criterio de organización</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel>Algoritmo</InputLabel>
            <Select
              label="Algoritmo"
              name="algoritmo"
              value={values.algoritmo}
              onChange={handleChange}
            >
              <MenuItem value={"ParesImpares"}>Pares Impares</MenuItem>
              <MenuItem value={"SegundaOpcion"}>Segunda Opcion</MenuItem>
            </Select>
            <FormHelperText>Criterio de escogencia</FormHelperText>
          </FormControl>
        </div>
        <div className="btn-datos">
          <button onClick={handleGenerate}> Generar </button>
        </div>
      </div>
    );
  } else if (partido._id) {
    return (
      <div className="equiposContainer">
        <div className="equipoLista">
            <label className="equipoTitle">Equipo A</label>
          {showEquipo(equipos.equipoA, "equipoA")}
        </div>
        <div className="equipoLista">
            <label className="equipoTitle">Equipo B</label>
          {showEquipo(equipos.equipoB, "equipoB")}
        </div>
      </div>
    );
  }
  return <></>;
}

export default PartidoEquipos;
