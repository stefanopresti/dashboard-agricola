/**
 * Componente Navlink
 * 
 * Link di navigazione stilizzato utilizzato nella navbar e nei pulsanti CTA.
 * Wrapper personalizzato del componente Link di React Router.
 */

import { Link } from 'react-router';

/**
 * Navlink Component
 * 
 * @param {string} to - URL di destinazione del link
 * @param {ReactNode} children - Contenuto testuale del link
 * 
 * Stile:
 * - Pulsante verde emerald con effetti hover
 * - Ombra e transizioni smooth
 * - Animazione di sollevamento al passaggio del mouse
 */
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