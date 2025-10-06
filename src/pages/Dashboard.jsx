/**
 * Pagina Dashboard
 * 
 * Questa pagina contiene la dashboard interattiva dell'applicazione.
 * Include Header, componente Dashboard principale e Footer.
 */

import DashboardComponent from '../components/dashboard/Dashboard.jsx'
import Header from '../components/header/Header.jsx'
import Footer from '../components/footer/Footer.jsx'

/**
 * Dashboard Page Component
 * 
 * Layout della pagina dashboard con:
 * - Header con navigazione
 * - Componente Dashboard con grafici e visualizzazioni
 * - Footer
 * 
 * Il layout utilizza flexbox per garantire che il footer
 * rimanga in fondo alla pagina anche con poco contenuto.
 */
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <DashboardComponent />
      <Footer />
    </div>
  )
}

export default Dashboard;