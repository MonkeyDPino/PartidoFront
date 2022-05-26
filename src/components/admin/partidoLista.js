import { useEffect, useState } from "react";
import "./partidoLista.css";
import { createLista, deleteDeLista, AddaLista } from "../../modules/partido";
import { getJugadores, getJugadoresNotIn } from "../../modules/jugador";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { styled } from '@mui/material/styles';

const ListaRow = styled(TableRow)`
  background-color: #9EFC95;
`;
const ListaHeadRow = styled(TableRow)`
  background-color: #27D616;
`;
const OutHeadRow = styled(TableRow)`
  background-color: #FF5B5B;
`;
const OutRow = styled(TableRow)`
  background-color: #FF8A8A;
`;


function PartidoLista({ partido, setPartido, actualizarPartido }) {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [playersOut, setPlayersOut] = useState([]);
  const [errorCreate, setErrorCreate] = useState(null);
  const [errorGetting, setErrorGetting] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [errorAdding, setErrorAdding] = useState(null);

  useEffect(() => {
    if (partido.lista && partido.lista.length > 0) {
      const ids = [];
      partido.lista.map((user) => {
        ids.push(user.id);
        return user;
      });
      getJugadores(ids)
        .then((response) => {
          if (response.error === "token is not valid") navigate("/login");
          if (!response.error && typeof response != "string") {
            setLista(response);
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
      setLista([]);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partido]);

  useEffect(() => {
    if (lista.length <= 0) {
      setPlayersOut([]);
      return;
    }

    const listaIds = lista.map((user) => user._id);
    getJugadoresNotIn(listaIds)
      .then((response) => {
        if (response.error === "token is not valid") navigate("/login");
        if (!response.error && typeof response != "string") {
          setPlayersOut(response);
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
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lista]);

  const handleCreate = () => {
    createLista(partido._id)
      .then((res) => {
        if (res.partidoActualizado) {
          setPartido(res.partidoActualizado);
          setErrorCreate(false);
        } else {
          setErrorCreate(true);
          if (res.error === "token is not valid") navigate("/login");
        }
      })
      .catch((err) => {
        setErrorCreate(true);
        if (err.error === "token is not valid") navigate("/login");
      });
  };

  const showErrorCreate = () => {
    if (errorCreate) {
      return <div className="error">Error al crear la lista</div>;
    }
  };

  const showErrorDelete = () => {
    if (errorDelete) {
      return <div className="error">Error al eliminar jugador de lista</div>;
    }
  };
  
  const showErrorAdding = () => {
    if (errorAdding) {
      return <div className="error">Error al agregar jugador a lista (max 10 jugadores)</div>;
    }
  };

  const listTable = () => {
    return (
      <div className="list-container">
        <h4>Lista de jugadores dentro del partido</h4>
        {showErrorDelete()}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <ListaHeadRow>
                <TableCell>Quitar</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Promedio Global</TableCell>
                <TableCell align="right">Promedio Ultimo Partido</TableCell>
                <TableCell align="right">Tipo</TableCell>
              </ListaHeadRow>
            </TableHead>
            <TableBody>
              {lista.map((user) => (
                <ListaRow
                  className="lista-Row"
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(user._id)}
                      className="deleteButton"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.nombre}
                  </TableCell>
                  <TableCell align="right">{user.correo}</TableCell>
                  <TableCell align="right">{user.promedioGlobal}</TableCell>
                  <TableCell align="right">{user.promedioLastMatch}</TableCell>
                  <TableCell align="right">{user.tipo}</TableCell>
                </ListaRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const OutTable = () => {
    return (
      <div className="list-container">
        <h4>Lista de jugadores para agregar al partido</h4>
        {showErrorAdding()}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <OutHeadRow>
                <TableCell>Agregar</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Promedio Global</TableCell>
                <TableCell align="right">Promedio Ultimo Partido</TableCell>
                <TableCell align="right">Tipo</TableCell>
              </OutHeadRow>
            </TableHead>
            <TableBody>
              {playersOut.map((user) => (
                <OutRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Button
                      onClick={() => handleAdd(user._id)}
                      className="deleteButton"
                      variant="outlined"
                      startIcon={<ArrowDownwardIcon />}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.nombre}
                  </TableCell>
                  <TableCell align="right">{user.correo}</TableCell>
                  <TableCell align="right">{user.promedioGlobal}</TableCell>
                  <TableCell align="right">{user.promedioLastMatch}</TableCell>
                  <TableCell align="right">{user.tipo}</TableCell>
                </OutRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const handleDelete = (idJugador) => {
    deleteDeLista(partido._id, idJugador)
      .then((response) => {
        if (response.error === "token is not valid") navigate("/login");
        if (!response.error && typeof response != "string" && response._id) {
          actualizarPartido();
          setErrorDelete(false);
        } else {
          setErrorDelete(true);
        }
      })
      .catch((err) => {
        if (err.error === "token is not valid") navigate("/login");
        setErrorDelete(true);
      });
  };

  const handleAdd = (idJugador) => {
    AddaLista(partido._id, idJugador).then((response) => {
      if (response.error === "token is not valid") navigate("/login");
      if (!response.error && typeof response != "string" && response._id) {
        actualizarPartido();
        setErrorAdding(false);
      } else {
        setErrorAdding(true);
      }
    })
    .catch((err) => {
      if (err.error === "token is not valid") navigate("/login");
      setErrorAdding(true);
    });
  };

  if (errorGetting) {
    return (
      <div className="partidoLista-container">
        <div className="error">Error al crear la lista</div>
      </div>
    );
  }

  return (
    <div className="partidoLista-container">
      {!lista.length > 0 && partido._id ? (
        <>
          <div className="btn-datos">
            <button onClick={handleCreate}> Generar Lista </button>
          </div>
          {showErrorCreate()}
        </>
      ) : partido._id ? (
        <>
          {OutTable()}
          {listTable()}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PartidoLista;
