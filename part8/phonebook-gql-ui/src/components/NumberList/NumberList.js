import React from 'react'
import { useSelector } from 'react-redux'
import { useField } from '../../hooks/index'
import Number from './Number'
import Filter from '../Filter'

const NumberList = () => {
  const nums = useSelector(state => state.numbers)
  const [filterText, clearFilterText] = useField('text')
  const numsToShow = filterText.value
    ? nums.filter(num =>
        num.name.toLowerCase().includes(filterText.value.toLowerCase())
      )
    : nums

  return (
    <>
      <Filter filterText={filterText} clearFilterText={clearFilterText} />
      {numsToShow.map(num => (
        <Number key={num.id} {...num} />
      ))}
    </>
  )
}

export default NumberList
