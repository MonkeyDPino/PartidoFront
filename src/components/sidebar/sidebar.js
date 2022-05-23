import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import { SidebarItems } from "./sidebarItems";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import "./sidebar.css";

function Sidebar({children,rol}) {
  const [showResSideBar, setResShowSideBar] = React.useState(false)
  // const [rol, setRol] = React.useState(localStorage.getItem('rol'))


  const ResSideBar = ()=>{
    if (showResSideBar) {
      return (
        <div className="Responsive-Sidebar">
            {rol === "Administrador" ? (
              <>
                {SidebarItems.Administrador.map((item, key) => {
                  return (
                    <div className="Responsive-Item" key={key}>
                      <NavLink to={item.link}>
                        {/* <div id="icon">{item.icon}</div> */}
                        <div id="sidebar-title">{item.title}</div>{" "}
                      </NavLink>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <Navigate to="/login" />
              </>
            )}
        </div>
      )
    }else{
      return (<></>)
    }
  }
    return (
      <div className="sidebar">
        <div className="SidebarList">
          <ul>
            {rol === "Administrador" ? (
              <>
                {SidebarItems.Administrador.map((item, key) => {
                  return (
                    <li key={key}>
                      <NavLink to={item.link}>
                        {/* <div id="icon">{item.icon}</div> */}
                        <div id="sidebar-title">{item.title}</div>{" "}
                      </NavLink>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <Navigate to="/login" />
              </>
            )}
          </ul>
        </div>
        <div className="Responsive-list">
          <div className="Responsive-header">
            <button onClick={() => setResShowSideBar(!showResSideBar)} className="Responsive-button">
                <FormatListBulletedOutlinedIcon></FormatListBulletedOutlinedIcon>
            </button>
          </div>
          {ResSideBar()}
        </div>
        {children}
      </div>
    );  
}

export default Sidebar;