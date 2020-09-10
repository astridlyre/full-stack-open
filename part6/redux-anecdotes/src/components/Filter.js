import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeFilter, makeFilterText } from '../reducers/filterReducer'

const Filter = () => {
  const [filterInput, setFilterInput] = useState(''),
    [filteringByText, setFilteringByText] = useState(false)

  const filterState = useSelector(({ filter }) =>
    filter.type === 'all' ? 1 : filter.type === 'votes' ? 2 : 3
  )

  const dispatch = useDispatch()

  const handleInput = event => {
    setFilterInput(event.target.value)
    if (!filteringByText) {
      setFilteringByText(true)
      dispatch(makeFilter('text'))
    }
    dispatch(makeFilterText(event.target.value))
  }

  const filter = type => {
    if (type === 'text') {
      dispatch(makeFilter(type))
      setFilteringByText(true)
    } else {
      dispatch(makeFilter(type))
      setFilterInput('')
      setFilteringByText(false)
    }
  }

  return (
    <div id='filter-div'>
      <div className='filter-div'>
        <input
          type='radio'
          name='filter'
          id='byvotes'
          checked={filterState === 2 ? true : false}
          onChange={() => filter('votes')}
        />
        <label htmlFor='byvotes'>
          <span>Filter by votes</span>
        </label>
      </div>
      <div className='filter-div'>
        <input
          type='radio'
          name='filter'
          id='byall'
          checked={filterState === 1 ? true : false}
          onChange={() => filter('all')}
        />
        <label htmlFor='byall'>
          <span>Filter by all</span>
        </label>
      </div>
      <div className='filter-div'>
        <input
          type='radio'
          name='filter'
          id='bytext'
          checked={filterState === 3 ? true : false}
          onChange={() => {
            filter('text')
            document.getElementById('bytext-input').focus()
          }}
        />
        <label htmlFor='bytext' className='filter-by-text'>
          <span>Filter by text:</span>
        </label>
        <input
          type='text'
          className={filteringByText ? 'filter-text-active' : 'filter-text'}
          id='bytext-input'
          value={filterInput}
          onChange={handleInput}
          placeholder='text to filter...'
        />
      </div>
    </div>
  )
}

export default Filter
