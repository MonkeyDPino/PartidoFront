import { useEffect, useState } from "react";
import "./partidoLista.css";
import { createLista,deleteDeLista } from "../../modules/partido";
import { getJugadores,getJugadoresNotIn } from "../../modules/jugador";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function PartidoLista({ partido, setPartido, actualizarPartido }) {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [playersOut, setPlayersOut] = useState([]);
  const [errorCreate, setErrorCreate] = useState(null);
  const [errorGetting, setErrorGetting] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);

  useEffect(() => {
    console.log("lista", lista);
    if (partido.lista && partido.lista.length > 0){
      const ids = []
      partido.lista.map(user => {
        ids.push(user.id)
      })
      getJugadores(ids)
      .then(response =>{
        if(response.error == "token is not valid") navigate("/login")
        if(!response.error && typeof response != "string"){
          setLista(response)
          setErrorGetting(false)
        }else{
          setErrorGetting(true)
        }
      })
      .catch(err =>{
        console.log(err)
        setErrorGetting(false)
      })
    }else{
      setLista([])
    }
  }, [partido]);

  useEffect(() => {
    if(lista.length <= 0){
      setPlayersOut([])
      return
    }

    const listaIds = lista.map((user) => user._id);
    getJugadoresNotIn(listaIds)
    .then(response =>{
      if(response.error == "token is not valid") navigate("/login")
      if(!response.error && typeof response != "string"){
        setPlayersOut(response)
        setErrorGetting(false)
      }else{
        setErrorGetting(true)
      }
    })
    .catch(err =>{
      console.log(err)
      setErrorGetting(false)
    })
  }, [lista]);

  const handleCreate = () => {
    createLista(partido._id)
      .then((res) => {
        if (res.partidoActualizado) {
          setPartido(res.partidoActualizado)
          setErrorCreate(false);
        } else {
          setErrorCreate(true);
          if (res.error == "token is not valid") navigate("/login");
        }
      })
      .catch((err) => {
        setErrorCreate(true);
        if (err.error == "token is not valid") navigate("/login");
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

  const listTable = () => {
    return (
      <div className="list-container">
        <h4>Lista de jugadores dentro del partido</h4>
        {showErrorDelete()}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Quitar</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Promedio Global</TableCell>
                <TableCell align="right">Promedio Ultimo Partido</TableCell>
                <TableCell align="right">Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Button
                      onClick={()=>handleDelete(user._id)}
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
                </TableRow>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Promedio Global</TableCell>
                <TableCell align="right">Promedio Ultimo Partido</TableCell>
                <TableCell align="right">Tipo</TableCell>
                <TableCell align="right">Agregar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playersOut.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.nombre}
                  </TableCell>
                  <TableCell align="right">{user.correo}</TableCell>
                  <TableCell align="right">{user.promedioGlobal}</TableCell>
                  <TableCell align="right">{user.promedioLastMatch}</TableCell>
                  <TableCell align="right">{user.tipo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const handleDelete = (idJugador) => {
    deleteDeLista(partido._id,idJugador)
    .then(response =>{
      if(response.error == "token is not valid") navigate("/login")
      if(!response.error && typeof response != "string" && response._id){
        actualizarPartido()
        setErrorDelete(false)
      }else{
        setErrorDelete(true)
      }
    })
    .catch(err =>{
      console.log(err)
      setErrorDelete(false)
    })
  }

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
        <>{OutTable()}{listTable()}</>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PartidoLista;



