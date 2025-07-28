import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice.js'
import cardSlice from './cardSlice.js'
import agriculturalReducer from './agriculturalSlice.js'

export default configureStore({
  reducer: {
    counter: counterReducer,
    cards: cardSlice,
    agricultural: agriculturalReducer
  },
})