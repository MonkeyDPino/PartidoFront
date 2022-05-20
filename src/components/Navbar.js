import { NavLink } from "react-router-dom";
function Navbar() {
    return ( <div>
        <ul>
            <li>
            <NavLink style={({isActive})=> ({color: isActive? "red":"blue"}) } to="/about">About</NavLink>
            </li>
            <li>
            <NavLink style={({isActive})=> ({color: isActive? "red":"blue"}) } to="/users">Users</NavLink>
            </li>
            <li>
            <NavLink style={({isActive})=> ({color: isActive? "red":"blue"}) } to="/login">Login</NavLink>
            </li>
        </ul>
    </div> );
}

export default Navbar;