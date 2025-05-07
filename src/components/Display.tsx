import React from 'react'

const Display: React.FC = React.memo(() => {

  return (
    <div className="bg-purple-300 p-4 text-right inset-shadow-sm inset-shadow-indigo-400/50 rounded-lg">
      <div className="text-grey-600 text-lg h-10">
        1
      </div>
      <div className="text-white text-2xl font-semibold overflow-x-auto">
        2
      </div>
    </div>
  )
})

export default Display