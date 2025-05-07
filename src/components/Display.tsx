import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'

const Display: React.FC = React.memo(() => {

  const { currentValue, previousValue, operation } = useSelector(
    (state: RootState) => state.calculator as {
      currentValue: string
      previousValue: string
      operation: string
      error: string | null
    }
  )

  return (
    <div className="bg-purple-300 p-4 text-right inset-shadow-sm inset-shadow-indigo-400/50 rounded-lg">
      <div className="text-grey-600 text-lg h-10">
        {previousValue} {operation}
      </div>
      <div className="text-white text-2xl font-semibold overflow-x-auto">
        {currentValue}
      </div>
    </div>
  )
})

export default Display