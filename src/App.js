import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from "./components/login/Login";
import Registro from "./components/register/register";
import Sidebar from "./components/sidebar/sidebar";
import PartidoMain from "./components/admin/partidoMain";
import PartidoCreate from "./components/admin/partidoCreate";
import Calificaciones from "./components/calificaciones/calificaciones";
import Baja from "./components/darseDeBaja/baja";
import MisCalificaciones from "./components/misCalificaciones/misCalificaciones";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <>
              <Sidebar rol="Administrador">
                <PartidoMain />
              </Sidebar>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Sidebar rol="Administrador">
                <PartidoMain />
              </Sidebar>
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <Sidebar rol="Administrador">
                <PartidoCreate />
              </Sidebar>
            </>
          }
        />
        <Route
          path="/calificacion"
          element={
            <>
              <Sidebar rol="Administrador">
                <Calificaciones />
              </Sidebar>
            </>
          }
        />
        <Route
          path="/baja"
          element={
            <>
              <Sidebar rol="Administrador">
                <Baja />
              </Sidebar>
            </>
          }
        />
        <Route
          path="/miscalificaciones"
          element={
            <>
              <Sidebar rol="Administrador">
                <MisCalificaciones />
              </Sidebar>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
