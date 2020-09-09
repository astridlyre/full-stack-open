import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterHelper } from '../reducers/blogReducer'

const Filters = () => {
  const showLiked = useSelector(state => state.showLiked)
  const dispatch = useDispatch()
  const filterStyles =
    'font-sm font-semibold text-dark hover:bg-dark hover:text-light px-2 focus:outline-none border-b-4 border-light'

  return (
    <div className='mt-8 flex items-center justify-evenly w-full p-2'>
      <button
        className={
          showLiked ? `${filterStyles}` : `${filterStyles} border-l-accent`
        }
        type='button'
        id='filter-recent'
        onClick={() => dispatch(filterHelper(false))}>
        most recent
      </button>
      <button
        className={
          !showLiked ? `${filterStyles}` : `${filterStyles} border-l-accent`
        }
        type='button'
        id='filter-liked'
        onClick={() => dispatch(filterHelper(true))}>
        top liked
      </button>
    </div>
  )
}

export default Filters
