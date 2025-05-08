import { configureStore } from '@reduxjs/toolkit'
import calculatorReducer from './calSlice'

// Create the Redux store and register the reducer
export const store = configureStore({
  reducer: {
    // The 'calculator' key will be used in state as state.calculator
    calculator: calculatorReducer
  }
})

// Define the RootState type based on the store's state structure
// This helps with type-checking in useSelector and other typed hooks
export type RootState = ReturnType<typeof store.getState>

// Define the AppDispatch type for useDispatch hook
// This helps with dispatching actions in a type-safe way
export type AppDispatch = typeof store.dispatch