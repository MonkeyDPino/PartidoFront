import { getPartidos } from "../../modules/partido";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PartidoDatos from "./partidoDatos";

function PartidoMain() {
  const navigate = useNavigate();
  const [partido, setPartido] = useState({});
  const [errorPartido, setErrorPartido] = useState(null);

  useEffect(() => {
    actualizarPartido();
  }, []);

  const actualizarPartido = () => {
    const partidos = getPartidos();
    if (partidos.error) {
      navigate("/login");
    } else {
      partidos
        .then((res) => {
          if(res.error == "token is not valid")navigate("/login");
          res.map((partido) => {
            // if(partido.estado === "Creado" || partido.estado === "EquiposGenerados"){
            //     setPartido(partido)
            //     setErrorPartido(false)
            // }
            if (partido._id === "6266d837414153f2d1ec1c73") {
              console.log(partido);
              setPartido(partido);
            }
            return partido;
          });
        })
        .catch((err) => {
            setErrorPartido(true)
          console.log("Error:", err);
        });
    }
  };
  const showError = ()=> {
    if(errorPartido){   
      return <div className="error">Error al capturar partido</div>;
    }
  }

  return (
    <div>
    {showError()}
      <PartidoDatos partido={partido} setPartido={setPartido} actualizarPartido={actualizarPartido} />
    </div>
  );
}

export default PartidoMain;
