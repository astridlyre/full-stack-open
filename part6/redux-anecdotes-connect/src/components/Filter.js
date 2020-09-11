import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeFilter, makeFilterText } from '../reducers/filterReducer'

const Filter = props => {
  const [filterInput, setFilterInput] = useState(''),
    [filteringByText, setFilteringByText] = useState(false)

  const handleInput = event => {
    setFilterInput(event.target.value)
    if (!filteringByText) {
      setFilteringByText(true)
      props.makeFilter('text')
    }
    props.makeFilterText(event.target.value)
  }

  const filter = type => {
    if (type === 'text') {
      props.makeFilter(type)
      setFilteringByText(true)
    } else {
      props.makeFilter(type)
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
          checked={props.filter === 2 ? true : false}
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
          checked={props.filter === 1 ? true : false}
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
          checked={props.filter === 3 ? true : false}
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

const mapStateToProps = ({ filter }) =>
  filter.type === 'all'
    ? { filter: 1 }
    : filter.type === 'votes'
    ? { filter: 2 }
    : { filter: 3 }

const mapDispatchToProps = {
  makeFilter,
  makeFilterText,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
