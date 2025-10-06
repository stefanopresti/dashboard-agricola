/**
 * Componente Footer
 * 
 * Footer dell'applicazione visualizzato in fondo a tutte le pagine.
 * Contiene copyright, anno corrente e link utili.
 */

/**
 * Footer Component
 * 
 * Struttura:
 * - Copyright dinamico con anno corrente
 * - Link a Privacy Policy, Termini di Servizio e Contatti
 * - Layout responsive con flexbox
 * 
 * Utilizza mt-auto per posizionarsi automaticamente in fondo alla pagina
 */
function Footer() {
  // Calcola l'anno corrente dinamicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Sezione copyright */}
          <div className="text-gray-600">
            <p className="text-sm">
              © {currentYear} Dashboard Agricola. Tutti i diritti riservati.
            </p>
          </div>
          
          {/* Link utili */}
          <div className="flex gap-6 text-sm text-gray-600">
            <a 
              href="#privacy" 
              className="hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="hover:text-gray-900 transition-colors"
            >
              Termini di Servizio
            </a>
            <a 
              href="#contact" 
              className="hover:text-gray-900 transition-colors"
            >
              Contatti
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
