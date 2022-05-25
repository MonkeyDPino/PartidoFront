import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { addDato, deleteDato } from "../../modules/partido";
import "./partidoDatos.css";

function PartidoDatos({ partido, setPartido, actualizarPartido }) {
  const navigate = useNavigate();
  const [datos, setdatos] = useState(partido.datos ? partido.datos : []);
  const [errorAdd, setErrorAdd] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const [values, setValues] = useState({
    llave: "",
    valor: "",
  });
  const [selectionModel, setSelectionModel] = useState([]);

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
      .then((response) => {
        if (response.acknowledged) {
          actualizarPartido();
          setErrorAdd(false);
        } else {
          if(response.error == "token is not valid")navigate("/login");
          setErrorAdd(true);
        }
        console.log(response);
      })
      .catch((error) => {
        if(error.error == "token is not valid")navigate("/login");
        console.log(error);
        setErrorAdd(true);
      });
  };

  const handleDelete = () => {
    deleteDato(partido._id, selectionModel)
      .then((response) => {
        if (response._id) {
          setPartido(response);
          setErrorDelete(false);
        } else {
          if(response.error == "token is not valid")navigate("/login");
          console.log("Error",response);
          setErrorDelete(true);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        if(error.error == "token is not valid")navigate("/login");
        setErrorDelete(true);
      });
  };

  const showErrorAdd = () => {
    if (errorAdd) {
      return <div className="error">Error al agregar dato</div>;
    }
  };
  const showErrorDelete = () => {
    if (errorDelete) {
      return <div className="error">Error al eliminar dato</div>;
    }
  };

  return (
    <div className="partidoDatos-container">
      {datos.length > 0 ? (
        <>
          <h4>Datos del partido</h4>
          <div style={{ height: 300 }}>
            <DataGrid
              checkboxSelection
              ColumnWidth="Auto"
              onSelectionModelChange={(newSelectionModel) => {
                console.log(newSelectionModel);
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              rows={datos}
              columns={columns}
              pageSize={datos.length < 6 ? datos.length : 5}
              rowsPerPageOptions={[datos.length < 6 ? datos.length : 5]}
              getRowId={(row) => row._id}
            />
          </div>
          <div className="deleteButtonContainer">
            <Button
              onClick={handleDelete}
              className="deleteButton"
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Eliminar Datos
            </Button>
            {showErrorDelete()}
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
      {showErrorAdd()}
      <div className="btn-datos">
        <button onClick={handleAdd}> Añadir </button>
      </div>
    </div>
  );
}

export default PartidoDatos;
