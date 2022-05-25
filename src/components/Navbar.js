import { NavLink } from "react-router-dom";
function Navbar() {
    return ( <div>
        <ul>
            <li>
            <NavLink style={({isActive})=> ({color: isActive? "red":"blue"}) } to="/login">Login</NavLink>
            </li>
            <li>
            <NavLink style={({isActive})=> ({color: isActive? "red":"blue"}) } to="/register">Register</NavLink>
            </li>
        </ul>
    </div> );
}

export default Navbar;