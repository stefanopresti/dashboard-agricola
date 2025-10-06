/**
 * Componente principale dell'applicazione (Home Page)
 * 
 * Questo componente rappresenta la pagina home dell'applicazione.
 * Include la pagina Home e il Footer, avvolti nel Provider Redux.
 */

import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Home from './pages/Home.jsx'
import Footer from './components/footer/Footer.jsx'

/**
 * App Component
 * 
 * Layout principale della homepage con:
 * - Provider Redux per la gestione dello stato globale
 * - Pagina Home con contenuto informativo
 * - Footer comune a tutta l'applicazione
 */
function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Home />
        <Footer />
      </div>
    </Provider>
  );
}

export default App