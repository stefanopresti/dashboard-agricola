import { configureStore } from '@reduxjs/toolkit'
import agriculturalReducer from './agriculturalSlice.js'

export default configureStore({
  reducer: {
    agricultural: agriculturalReducer
  },
})