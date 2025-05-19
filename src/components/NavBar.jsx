import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Lista Task</NavLink> |{" "}
      <NavLink to="/add">Aggiungi Task</NavLink>
    </nav>
  );
}
export default NavBar;
