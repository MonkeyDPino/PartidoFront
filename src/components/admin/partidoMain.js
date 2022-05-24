import {getPartidos} from "../../modules/partido"
import {useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import PartidoDatos from "./partidoDatos"


function PartidoMain() {
    const navigate = useNavigate()
    const [partido,setPartido] = useState({})

    useEffect(() => {
        const partidos = getPartidos();
        if(partidos.error){
            navigate("/login")
        }else{
            partidos.then((res)=>{
                console.log(res)
                res.map(partido =>{
                    // if(partido.estado === "Creado" || partido.estado === "EquiposGenerados"){
                    //     setPartido(partido)
                    // }
                    if(partido._id === "6266d837414153f2d1ec1c73"){   
                        console.log(partido)
                        setPartido(partido)
                    }
                    return partido;
                })
            }).catch((err)=>{
                console.log(err);
            })
        }
      }, []);
    
    return ( <><PartidoDatos partido={partido} setPartido={setPartido}/></> );
}

export default PartidoMain;