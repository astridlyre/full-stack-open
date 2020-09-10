import React from 'react'
import Statistic from './Statistic'

const Statistics = ({ subheading, feedbackTypes, feedbackValues }) => {
  const { good, neutral, bad } = feedbackValues
  const total = good + neutral + bad
  const average = () => (total ? ((good - bad) / total).toFixed(2) : 0)
  const isFeedBack = () => (total > 0 ? true : false)

  return (
    <section className='pt-4'>
      <h2>{subheading}</h2>
      {!isFeedBack() && <div>No Feedback given</div>}
      {isFeedBack() && (
        <div className='grid-3-col'>
          <Statistic text={feedbackTypes[0]} value={good} />
          <Statistic text={feedbackTypes[1]} value={neutral} />
          <Statistic text={feedbackTypes[2]} value={bad} />
          <Statistic text='total' value={total} />
          <Statistic text='average' value={average()} />
          <Statistic
            text='positive'
            value={Math.round((good / total) * 100) + '%'}
          />
        </div>
      )}
    </section>
  )
}

export default Statistics
