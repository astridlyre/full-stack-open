import React from 'react'

const Counter = ({ counter }) => (
  <div className='container'>
    <h1>This is a spiffy counter</h1>
    <span>{counter.value}</span>
    <div className='buttons'>
      <button onClick={counter.increment}>Plus</button>
      <button onClick={counter.decrement}>Minus</button>
      <button onClick={counter.zero}>Zero</button>
    </div>
  </div>
)

export default Counter
