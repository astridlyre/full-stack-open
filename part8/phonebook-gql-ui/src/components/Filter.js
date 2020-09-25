import React from 'react'
import LabeledInput from './LabeledInput'

const Filter = ({ filterText, clearFilterText }) => (
  <div className='mt-8 filter-div'>
    <LabeledInput text='Filter by name: ' name='filter' input={filterText} />
    <button
      onClick={clearFilterText}
      type='button'
      className='mt-4 btn btn-gray'>
      clear
    </button>
  </div>
)

export default Filter
