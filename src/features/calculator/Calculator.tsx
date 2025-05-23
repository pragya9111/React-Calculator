import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../../app/store'
import { addDigit, chooseOperation, clear, deleteDigit, evaluate, clearError } from '../../app/calSlice'
import Display from '../../components/Display'
import Button from '../../components/Button'

const Calculator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { error } = useSelector((state: RootState) => state.calculator as { error: string | null })

  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle digit keys (0-9)
    if (e.key >= '0' && e.key <= '9') {
      dispatch(addDigit(e.key))
    }
    // Handle decimal point
    else if (e.key === '.') {
      dispatch(addDigit('.'))
    }
    // Handle basic operations: +, -, *, /
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      // Convert * and / to × and ÷ for display
      const operation = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key
      dispatch(chooseOperation(operation))
    }
    // Handle Enter key to evaluate expression
    else if (e.key === 'Enter') {
      dispatch(evaluate())
    }
    // Handle Escape key to clear all input
    else if (e.key === 'Escape') {
      dispatch(clear())
    }
    // Handle Backspace key to delete last digit
    else if (e.key === 'Backspace') {
      dispatch(deleteDigit())
    }
  }
  
  useEffect(() => {
    // Add keydown event listener to window on mount
    window.addEventListener('keydown', handleKeyDown)
  
    // Remove event listener on unmount to avoid memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, []) // Empty dependency array = run once on mount
  
  useEffect(() => {
    // If there's an error, set a timeout to auto-clear it after 3 seconds
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 3000)
  
      // Clear the timer if the component re-renders before 3 seconds
      return () => clearTimeout(timer)
    }
  }, [error, dispatch]) // Run whenever 'error' or 'dispatch' changes
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="w-full max-w-xs shadow-2xl p-2 rounded-lg overflow-hidden bg-purple-200 shadow-purple-500/50">
        <Display />

        <div className="grid grid-cols-4 gap-1 p-1 bg-purple-200">
          <Button
            value="AC"
            variant="clear"
            onClick={() => dispatch(clear())}
            className="col-span-2 py-4"
            ariaLabel="All clear"
          />
          <Button
            value="DEL"
            variant="delete"
            onClick={() => dispatch(deleteDigit())}
            className="py-4"
            ariaLabel="Delete"
          />
          <Button
            value="÷"
            variant="operator"
            onClick={() => dispatch(chooseOperation('÷'))}
            className="py-4"
          />

          <Button value="7" onClick={() => dispatch(addDigit('7'))} className="py-4" />
          <Button value="8" onClick={() => dispatch(addDigit('8'))} className="py-4" />
          <Button value="9" onClick={() => dispatch(addDigit('9'))} className="py-4" />
          <Button
            value="×"
            variant="operator"
            onClick={() => dispatch(chooseOperation('×'))}
            className="py-4"
          />

          <Button value="4" onClick={() => dispatch(addDigit('4'))} className="py-4" />
          <Button value="5" onClick={() => dispatch(addDigit('5'))} className="py-4" />
          <Button value="6" onClick={() => dispatch(addDigit('6'))} className="py-4" />
          <Button
            value="-"
            variant="operator"
            onClick={() => dispatch(chooseOperation('-'))}
            className="py-4"
          />

          <Button value="1" onClick={() => dispatch(addDigit('1'))} className="py-4" />
          <Button value="2" onClick={() => dispatch(addDigit('2'))} className="py-4" />
          <Button value="3" onClick={() => dispatch(addDigit('3'))} className="py-4" />
          <Button
            value="+"
            variant="operator"
            onClick={() => dispatch(chooseOperation('+'))}
            className="py-4"
          />

          <Button
            value="0"
            onClick={() => dispatch(addDigit('0'))}
            className="col-span-2 py-4"
          />
          <Button value="." onClick={() => dispatch(addDigit('.'))} className="py-4" />
          <Button
            value="="
            variant="equals"
            onClick={() => dispatch(evaluate())}
            className="py-4"
          />
        </div>
      </div>
    </div>
  )
}

export default Calculator