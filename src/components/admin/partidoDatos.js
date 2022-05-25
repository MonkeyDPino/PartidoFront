import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import {addDato} from "../../modules/partido"
import "./partidoDatos.css";

function PartidoDatos({ partido,actualizarPartido }) {
  const [datos, setdatos] = useState(partido.datos ? partido.datos : []);
  const [errorAdd, setErrorAdd] = useState(null);
  const [values, setValues] = useState({
    llave: "",
    valor: "",
  });
  useEffect(() => {
    if (partido.datos) setdatos(partido.datos);
  }, [partido]);

  const columns = [
    { field: "llave", headerName: "llave" },
    { field: "valor", headerName: "Valor" },
  ];

  const handleChange = (event) => {
    console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleAdd = () => {
    addDato(values.llave, values.valor, partido._id)
    .then((response)=>{
      if(response.acknowledged){
        actualizarPartido();
        setErrorAdd(false)
      }else{
        setErrorAdd(true)
      }
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
      setErrorAdd(true)
    })
  }

  const showError = ()=> {
    if(errorAdd){   
      return <div className="error">Error al agregar dato</div>
    }
  }

  return (
    <div className="partidoDatos-container">
      {datos.length > 0 ? (
        <>
          <h4>Datos del partido</h4>
          <div style={{ height: 300 }}>
            <DataGrid
              ColumnWidth="Auto"
              rows={datos}
              columns={columns}
              pageSize={datos.length < 6 ? datos.length : 5}
              rowsPerPageOptions={[datos.length < 6 ? datos.length : 5]}
              getRowId={(row) => row._id}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <h4>Añadir Dato al Partido</h4>

      <div className="dataInput">
        <div className="input-container">
          <TextField
            id="login-email"
            label="Llave"
            name="llave"
            fullWidth
            autoComplete="off"
            value={values.llave}
            onChange={handleChange}
            margin="normal"
          />
        </div>
        <div className="input-container">
          <TextField
            id="login-email"
            label="Valor"
            name="valor"
            fullWidth
            value={values.valor}
            autoComplete="off"
            onChange={handleChange}
            margin="normal"
          />
        </div>
      </div>
      {showError()}
      <div className="btn-datos">
          <button onClick={handleAdd}> Añadir </button>
        </div>
    </div>
  );
}

export default PartidoDatos;
