import Navlink from './Navlink';

function Navbar() {
  return (
    <nav>
      <ul className="flex flex-col md:flex-row gap-2 md:gap-3">
        <li>
          <Navlink to="/">Home</Navlink>
        </li>
        <li>
          <Navlink to="/dashboard">Dashboard</Navlink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;