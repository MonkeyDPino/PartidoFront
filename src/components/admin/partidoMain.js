import { getPartidos } from "../../modules/partido";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PartidoDatos from "./partidoDatos";
import PartidoLista from "./partidoLista";
import PartidoEquipos from "./partidoEquipos";
import PartidoOptions from "./partidoOptions";

function PartidoMain() {
  const navigate = useNavigate();
  const [partido, setPartido] = useState({
    fecha:"",
    lugar:"",
    estado:""
  });
  const [errorPartido, setErrorPartido] = useState(null);

  useEffect(() => {
    actualizarPartido();
  }, []);

  const actualizarPartido = () => {
    let capturado = false;
    const partidos = getPartidos();
    if (partidos.error) {
      navigate("/login");
    } else {
      partidos
        .then((res) => {
          if (res.error === "token is not valid") navigate("/login");
          res.map((partido) => {
            if (
              partido.estado === "Creado" ||
              partido.estado === "EquiposGenerados"
            ) {
              
    capturado = true;
              setPartido(partido);
              setErrorPartido(false);
            }
            return partido;
          });
          if(!capturado)navigate("/create");
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
        <h2>Partido Dashboard</h2>
        <div className="dataShow">
          <h4 className="dataField">{"Fecha:\t"+partido.fecha}</h4>
          <h4 className="dataField">{"Lugar:"+partido.lugar}</h4>
          <h4 className="dataField">{"Estado:"+partido.estado}</h4>
        </div>
        <PartidoDatos
          partido={partido}
          setPartido={setPartido}
          actualizarPartido={actualizarPartido}
        />
        <PartidoLista
        partido={partido}
        setPartido={setPartido}
        actualizarPartido={actualizarPartido}/>
        <PartidoEquipos
        partido={partido}
        setPartido={setPartido}
        actualizarPartido={actualizarPartido}/>
        <PartidoOptions
        partido={partido}
        setPartido={setPartido}
        actualizarPartido={actualizarPartido}
        />
      </div>
    );
  }
  
}

export default PartidoMain;
