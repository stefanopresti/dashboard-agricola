/**
 * Store Redux dell'applicazione
 * 
 * Configura e esporta lo store Redux utilizzando Redux Toolkit.
 * Lo store centralizza lo stato dell'applicazione e gestisce i dati agricoli.
 */

import { configureStore } from '@reduxjs/toolkit'
import agriculturalReducer from './agriculturalSlice.js'

/**
 * Configurazione dello store Redux
 * 
 * @reducer agricultural - Gestisce tutti i dati relativi all'agricoltura
 *   (metriche, raccolti, qualità, terreno, meteo, range di date)
 */
export default configureStore({
  reducer: {
    agricultural: agriculturalReducer
  },
})