import React from 'react'

const Filter = ({ genres, filter, setFilter }) => {
  const filters = Array.from(genres)

  return (
    <div className='grid grid-cols-2 sm:grid-cols-5 gap-x-2 gap-y-2 mt-2 fade-slide-down-effect'>
      <button
        onClick={() => setFilter(null)}
        className='p-2 bg-gray-700 font-semibold text-sm bg-opacity-75 hover:bg-opacity-100 ease-out-effect rounded'>
        clear filters
      </button>
      {filters.map((g, i) => (
        <button
          key={i}
          className={`${
            filter === g.toLowerCase() ? 'bg-orange-500' : 'bg-gray-800'
          } p-2 bg-opacity-50 font-semibold text-sm hover:bg-opacity-100 ease-out-effect rounded`}
          onClick={() => setFilter(g.toLowerCase())}>
          {g.toLowerCase()}
        </button>
      ))}
    </div>
  )
}

export default Filter
