import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Registro from "./components/register/register";
import Sidebar from "./components/sidebar/sidebar";
import PartidoMain from "./components/admin/partidoMain";
import PartidoCreate from "./components/admin/partidoCreate";
import Calificaciones from "./components/calificaciones/calificaciones";
import Baja from "./components/darseDeBaja/baja";
import MisCalificaciones from "./components/misCalificaciones/misCalificaciones";
import React from "react";
import ProtectedRoute from "./components/protectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <ProtectedRoute redirectTo ="yes">
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin = "1">
              <Sidebar>
                <PartidoMain />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute isAdmin = "1">
              <Sidebar rol="Administrador">
                <PartidoCreate />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calificacion"
          element={
            <ProtectedRoute isAdmin = "">
              <Sidebar rol="Administrador">
                <Calificaciones />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/baja"
          element={
            <ProtectedRoute isAdmin = "">
              <Sidebar rol="Administrador">
                <Baja />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/miscalificaciones"
          element={
            <ProtectedRoute isAdmin = "">
              <Sidebar rol="Administrador">
                <MisCalificaciones />
              </Sidebar>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
