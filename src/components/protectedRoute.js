import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
function ProtectedRoute({ children, isAdmin, redirectTo }) {
  const navigate = useNavigate();
  const [rolGet] = useState(
    localStorage.getItem("accessToken")
      ? jwt.decode(localStorage.getItem("accessToken"), "partido").rol
      : null
  );

  useEffect(()=>{
    if (redirectTo === "yes") {
        if (rolGet === "Administrador") {
          navigate("/dashboard");
        } else if (rolGet === "Jugador") {
          navigate("/miscalificaciones");
        } else {
          navigate("/login");
        }
      }
  },[])

  if (
    (isAdmin && "Administrador" !== rolGet) ||
    !["Jugador", "Administrador"].includes(rolGet)
  ) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
