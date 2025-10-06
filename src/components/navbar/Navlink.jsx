import { Link } from 'react-router';

function Navlink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}

export default Navlink;