import Navlink from './Navlink';

function Navbar() {
  return (
    <nav className="brutal-nav">
      <ul className="brutal-nav-list">
        <li>
          <Navlink to="/">Home</Navlink>
        </li>
        <li>
          <Navlink to="/dashboard">Dashboard</Navlink>
        </li>
        <li>
          <Navlink to="/contacts">Contacts</Navlink>
        </li>
        <li>
          <Navlink to="/about">About</Navlink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
