import { Link } from 'react-router';

function Navlink({ to, children }) {
  return (
    <Link to={to} className="brutal-nav-link">
      {children}
    </Link>
  );
}

export default Navlink;