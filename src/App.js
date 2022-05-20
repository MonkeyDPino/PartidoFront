import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About"
import Home from "./components/Home"
import Users from "./components/Users"
import NotFound from "./components/NotFound"
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound/>} />
        <Route path="/" element={<><Home/></>} />
        <Route path="/about" element={<About/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
