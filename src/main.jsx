/**
 * Punto di ingresso dell'applicazione
 * 
 * Questo file configura il routing dell'applicazione e inizializza React con Redux.
 * Utilizza React Router per la navigazione tra le pagine Home e Dashboard.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Dashboard from './pages/Dashboard.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

/**
 * Configurazione delle route dell'applicazione
 * - '/' : Pagina home con presentazione del progetto
 * - '/dashboard' : Dashboard interattiva con grafici e dati
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

/**
 * Renderizza l'applicazione React nel DOM
 * - StrictMode: Abilita controlli aggiuntivi durante lo sviluppo
 * - Provider: Fornisce lo store Redux a tutta l'applicazione
 * - RouterProvider: Gestisce il routing dell'applicazione
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>

      </RouterProvider>
    </Provider>
  </StrictMode>,
)
