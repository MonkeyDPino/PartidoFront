import "./partidoOptions.css";
import { cancelPartido,confirmPartido } from "../../modules/partido";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PartidoOptions({ partido, setPartido, actualizarPartido }) {
  const navigate = useNavigate();
  const [errorCancel, setErrorCancel] = useState(null);
  const [errorConfirm, setErrorConfirm] = useState(null);

  const handleCancel = () => {
    cancelPartido(partido._id)
      .then((response) => {
        if (response.error === "token is not valid") navigate("/login");
        if (response._id) {
          actualizarPartido();
          setErrorCancel(false);
        } else {
          setErrorCancel(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.error === "token is not valid") navigate("/login");
        setErrorCancel(true);
      });
  };

  const handleConfirm = () => {
    confirmPartido(partido._id)
      .then((response) => {
        if (response.error === "token is not valid") navigate("/login");
        if (response.partidoActualizado) {
          actualizarPartido();
          setErrorConfirm(false);
        } else {
            setErrorConfirm(true);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.error === "token is not valid") navigate("/login");
        setErrorConfirm(true);
      });
  };

  const showErrorCancel = () => {
    if (errorCancel) {
      return <div className="error">Error al cancelar partido</div>;
    }
  };

  const showErrorConfirm = () => {
    if (errorConfirm) {
      return <div className="error">Error al confirmar partido</div>;
    }
  };

  return (
    <div className="optionsContainer">
      <h4> Opciones de finalización</h4>
      <div className="dataInput">
        <div className="btn-datos">
          <button onClick={handleConfirm}> Confirmar </button>
        </div>
        <div className="btn-datos">
          <button onClick={handleCancel}> Cancelar </button>
        </div>
      </div>
      {showErrorCancel()}
      {showErrorConfirm()}
    </div>
  );
}

export default PartidoOptions;
