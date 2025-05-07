import React from 'react'
import Display from '../../components/Display'
import Button from '../../components/Button'

const Calculator: React.FC = () => {

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="w-full max-w-xs shadow-2xl p-2 rounded-lg overflow-hidden bg-purple-200 shadow-purple-500/50">
        <Display />

        <div className="grid grid-cols-4 gap-1 p-1 bg-purple-200">
          <Button
            value="AC"
            variant="clear"
            onClick={() => alert('Clear all')}
            className="col-span-2 py-4"
            ariaLabel="All clear"
          />
          <Button
            value="DEL"
            variant="delete"
            onClick={() => alert('Delete last digit')}
            className="py-4"
            ariaLabel="Delete"
          />
          <Button
            value="÷"
            variant="operator"
            onClick={() => alert('Choose division')}
            className="py-4"
          />

          <Button value="7" onClick={() => alert("7")} className="py-4" />
          <Button value="8" onClick={() => alert("8")} className="py-4" />
          <Button value="9" onClick={() => alert("9")} className="py-4" />
          <Button
            value="×"
            variant="operator"
            onClick={() => alert("*")}
            className="py-4"
          />

          <Button value="4" onClick={() => alert("4")} className="py-4" />
          <Button value="5" onClick={() => alert("5")} className="py-4" />
          <Button value="6" onClick={() => alert("6")} className="py-4" />
          <Button
            value="-"
            variant="operator"
            onClick={() => alert("-")}
            className="py-4"
          />

          <Button value="1" onClick={() => alert("1")} className="py-4" />
          <Button value="2" onClick={() => alert("2")} className="py-4" />
          <Button value="3" onClick={() => alert("3")} className="py-4" />
          <Button
            value="+"
            variant="operator"
            onClick={() => alert("+")}
            className="py-4"
          />

          <Button
            value="0"
            onClick={() => alert("7")}
            className="col-span-2 py-4"
          />
          <Button value="." onClick={() => alert(".")} className="py-4" />
          <Button
            value="="
            variant="equals"
            onClick={() => alert("=")}
            className="py-4"
          />
        </div>
      </div>
    </div>
  )
}

export default Calculator