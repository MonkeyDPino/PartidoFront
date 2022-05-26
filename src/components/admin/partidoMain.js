import { getPartidos } from "../../modules/partido";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PartidoDatos from "./partidoDatos";
import PartidoLista from "./partidoLista"

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
          if (res.error == "token is not valid") navigate("/login");
          res.map((partido) => {
            if (
              partido.estado === "Creado" ||
              partido.estado === "EquiposGenerados"
            ) {
              setPartido(partido);
              setErrorPartido(false);
            }
            return partido;
          });
        })
        .catch((err) => {
          setErrorPartido(true);
          console.log("Error:", err);
        });
    }
  };

  if (errorPartido) {
    return <div><div className="error">Error al capturar partido</div></div>
  }else{
    return (
      <div>
        <PartidoDatos
          partido={partido}
          setPartido={setPartido}
          actualizarPartido={actualizarPartido}
        />
        <PartidoLista
        partido={partido}
        setPartido={setPartido}
        actualizarPartido={actualizarPartido}/>
      </div>
    );
  }
  
}

export default PartidoMain;
