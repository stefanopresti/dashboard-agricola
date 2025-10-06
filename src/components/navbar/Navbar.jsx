/**
 * Componente Navbar
 * 
 * Barra di navigazione principale dell'applicazione.
 * Contiene i link per navigare tra le pagine Home e Dashboard.
 */

import Navlink from './Navlink';

/**
 * Navbar Component
 * 
 * Fornisce navigazione tra le diverse sezioni dell'app:
 * - Home: Pagina di presentazione
 * - Dashboard: Interfaccia con grafici e dati
 * 
 * Layout responsive che passa da colonna (mobile) a riga (desktop)
 */
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