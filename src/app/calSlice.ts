import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CalculatorState {
  currentValue: string
  previousValue: string
  operation: string | null
  overwrite: boolean
  error: string | null
}

const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operation: null,
  overwrite: false,
  error: null
}

const MAX_DIGITS = 12

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    // Handles number and decimal input
    addDigit: (state, action: PayloadAction<string>) => {
      if (state.error) return // Don't allow input if there's an error

      if (state.overwrite) {
        // If the result was just evaluated, start fresh with new digit
        state.currentValue = action.payload
        state.overwrite = false
        return
      }

      if (state.currentValue === '0' && action.payload !== '.') {
        // Replace starting '0' with new digit
        state.currentValue = action.payload
        return
      }

      if (action.payload === '.' && state.currentValue.includes('.')) {
        // Prevent multiple decimal points
        return
      }

      if (state.currentValue.length >= MAX_DIGITS) {
        // Limit max digits
        return
      }

      // Append digit
      state.currentValue = `${state.currentValue}${action.payload}`
    },

    // Handles choosing operations like +, -, ×, ÷
    chooseOperation: (state, action: PayloadAction<string>) => {
      if (state.error) return // Don't do anything if there's an error

      if (state.currentValue === '0' && state.previousValue === '') {
        // Do nothing if no valid input yet
        return
      }

      if (state.previousValue === '') {
        // Store currentValue in previousValue, and store selected operation
        state.previousValue = state.currentValue
        state.operation = action.payload
        state.currentValue = '0'
        return
      }

      if (state.currentValue === '0') {
        // Allow changing operation before entering new value
        state.operation = action.payload
        return
      }

      // Perform calculation with previous and current values
      const result = calculate(
        parseFloat(state.previousValue),
        parseFloat(state.currentValue),
        state.operation
      )

      if (typeof result === 'string') {
        // Handle error (e.g., divide by zero)
        state.error = result
        return
      }

      // Save result as new previousValue and update operation
      state.previousValue = String(result)
      state.currentValue = '0'
      state.operation = action.payload
    },

    // Resets calculator to initial state
    clear: () => initialState,

    // Handles deleting a digit
    deleteDigit: (state) => {
      if (state.error) {
        // Clear error on delete
        state.error = null
        return
      }

      if (state.overwrite) {
        // Reset after overwrite
        state.overwrite = false
        state.currentValue = '0'
        return
      }

      if (state.currentValue.length === 1) {
        // If only 1 digit, reset to '0'
        state.currentValue = '0'
        return
      }

      // Remove last digit
      state.currentValue = state.currentValue.slice(0, -1)
    },

    // Evaluates the expression
    evaluate: (state) => {
      if (state.error || state.operation === null || state.previousValue === '') {
        // Don't evaluate if there's not enough data
        return
      }

      const result = calculate(
        parseFloat(state.previousValue),
        parseFloat(state.currentValue),
        state.operation
      )

      if (typeof result === 'string') {
        // Handle error in calculation
        state.error = result
        return
      }

      // Display result and prepare for next input
      state.currentValue = String(result)
      state.previousValue = ''
      state.operation = null
      state.overwrite = true
    },

    // Clears just the error
    clearError: (state) => {
      state.error = null
    }
  }
})

// Calculation helper
function calculate(a: number, b: number, operation: string | null): number | string {
  switch (operation) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '×':
      return a * b
    case '÷':
      if (b === 0) return 'Cannot divide by zero'
      return a / b
    default:
      return b
  }
}

// Export actions and reducer
export const {
  addDigit,
  chooseOperation,
  clear,
  deleteDigit,
  evaluate,
  clearError
} = calculatorSlice.actions

export default calculatorSlice.reducer