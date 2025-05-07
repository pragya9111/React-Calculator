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
    addDigit: (state, action: PayloadAction<string>) => {
      if (state.error) return

      if (state.overwrite) {
        state.currentValue = action.payload
        state.overwrite = false
        return
      }

      if (state.currentValue === '0' && action.payload !== '.') {
        state.currentValue = action.payload
        return
      }

      if (action.payload === '.' && state.currentValue.includes('.')) {
        return
      }

      if (state.currentValue.length >= MAX_DIGITS) {
        return
      }

      state.currentValue = `${state.currentValue}${action.payload}`
    },

    chooseOperation: (state, action: PayloadAction<string>) => {
      if (state.error) return

      if (state.currentValue === '0' && state.previousValue === '') {
        return
      }

      if (state.previousValue === '') {
        state.previousValue = state.currentValue
        state.operation = action.payload
        state.currentValue = '0'
        return
      }

      if (state.currentValue === '0') {
        state.operation = action.payload
        return
      }

      const result = calculate(
        parseFloat(state.previousValue),
        parseFloat(state.currentValue),
        state.operation
      )

      if (typeof result === 'string') {
        state.error = result
        return
      }

      state.previousValue = String(result)
      state.currentValue = '0'
      state.operation = action.payload
    },

    clear: () => initialState,

    deleteDigit: (state) => {
      if (state.error) {
        state.error = null
        return
      }

      if (state.overwrite) {
        state.overwrite = false
        state.currentValue = '0'
        return
      }

      if (state.currentValue.length === 1) {
        state.currentValue = '0'
        return
      }

      state.currentValue = state.currentValue.slice(0, -1)
    },

    evaluate: (state) => {
      if (state.error || state.operation === null || state.previousValue === '') {
        return
      }

      const result = calculate(
        parseFloat(state.previousValue),
        parseFloat(state.currentValue),
        state.operation
      )

      if (typeof result === 'string') {
        state.error = result
        return
      }

      state.currentValue = String(result)
      state.previousValue = ''
      state.operation = null
      state.overwrite = true
    },

    clearError: (state) => {
      state.error = null
    }
  }
})

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

export const {
  addDigit,
  chooseOperation,
  clear,
  deleteDigit,
  evaluate,
  clearError
} = calculatorSlice.actions

export default calculatorSlice.reducer