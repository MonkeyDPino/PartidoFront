import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About"
import Home from "./components/Home"
import Users from "./components/Users"
import NotFound from "./components/NotFound"
import Login from "./components/login/Login";
import Registro from "./components/register/register";
import Sidebar from "./components/sidebar/sidebar";
import PartidoMain from "./components/admin/partidoMain"
import React from 'react';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound/>} />
          <Route path="/" element={<><Home/></>} />
          <Route path="/about" element={<About/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registro/>} />
          <Route path="/sidebar" element={<><Sidebar rol="Administrador"><PartidoMain/></Sidebar></>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
