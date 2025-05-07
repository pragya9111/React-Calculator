import React from 'react'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../../app/store'
import { addDigit, chooseOperation, clear, deleteDigit, evaluate } from '../../app/calSlice'
import Display from '../../components/Display'
import Button from '../../components/Button'

const Calculator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

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