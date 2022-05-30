import { useNavigate } from "react-router-dom";
function LogoutButton() {
    const navigate = useNavigate();
  const LogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("rol");
    localStorage.removeItem("exp");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div >
      <button className="LogOutButton" onClick={LogOut}>Log Out</button>
    </div>
  );
}

export default LogoutButton;
