import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { delNum } from '../../reducers/numbers'
import { ReactComponent as Icon } from '../../assets/img/x.svg'
import { ReactComponent as MoreIcon } from '../../assets/img/more.svg'
import Address from './Address'

const Number = ({ name, phone, address, id }) => {
  const dispatch = useDispatch()
  const [showAddress, setShowAddress] = useState(false)

  return (
    <div className='number flex justify-between'>
      <h6>{name}</h6>
      <div className='number-info flex justify-between'>
        <div className='mr-2'>
          <h6 className='d-accent'>{phone}</h6>
          {showAddress && <Address {...address} />}
        </div>
        <div className='flex flex-col'>
          <button
            type='button'
            className='btn-del-num'
            onClick={() => dispatch(delNum(id))}>
            <Icon />
          </button>
          <button
            type='button'
            className='mt-4 btn-more-num'
            onClick={() => setShowAddress(!showAddress)}>
            <MoreIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Number
