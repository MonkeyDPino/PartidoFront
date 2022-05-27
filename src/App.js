import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound"
import Login from "./components/login/Login";
import Registro from "./components/register/register";
import Sidebar from "./components/sidebar/sidebar";
import PartidoMain from "./components/admin/partidoMain"
import PartidoCreate from "./components/admin/partidoCreate";
import React from 'react';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound/>} />
          <Route path="/" element={<><Sidebar rol="Administrador"><PartidoMain/></Sidebar></>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registro/>} />
          <Route path="/sidebar" element={<><Sidebar rol="Administrador"><PartidoMain/></Sidebar></>} />
          <Route path="/create" element={<><Sidebar rol="Administrador"><PartidoCreate/></Sidebar></>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
