import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterLikes } from '../../reducers/filter'
import TextButton from '../Buttons/TextButton'

const Filter = () => {
  const filterStatus = useSelector(state => state.filterLikes)
  const dispatch = useDispatch()

  return (
    <div>
      <TextButton func={() => dispatch(filterLikes(true))} text='Most liked' />
      <TextButton
        func={() => dispatch(filterLikes(false))}
        text='Most recent'
      />
    </div>
  )
}

export default Filter
