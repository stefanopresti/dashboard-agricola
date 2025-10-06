/**
 * Componente Header
 * 
 * Header dell'applicazione visualizzato in tutte le pagine.
 * Contiene il titolo dell'app, sottotitolo e navigazione.
 */

import Navbar from '../navbar/Navbar'

/**
 * Header Component
 * 
 * Struttura:
 * - Container responsive con padding adattivo
 * - Titolo principale "Dashboard Agricola"
 * - Sottotitolo descrittivo
 * - Componente Navbar per la navigazione
 * 
 * Design responsive che adatta layout e dimensioni dei testi su diversi dispositivi
 */
function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-row md:justify-between md:items-center py-8 gap-6">
          {/* Sezione titolo e descrizione */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Dashboard Agricola
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-3">
              Monitoraggio prestazioni aziendali - Generazione dati automatica
            </p>
          </div>
          {/* Navigazione */}
          <Navbar />
        </div>
      </div>
    </header>
  )
}

export default Header;