import React from 'react'

const Header = ({ title, feedbackValues }) => {
  const { good, neutral, bad } = feedbackValues

  const highestValue = () => {
    if (good > neutral && good > bad) {
      return 'good-img'
    } else if (neutral > good && neutral > bad) {
      return 'neutral-img'
    } else if (bad > good && bad > neutral) {
      return 'bad-img'
    } else {
      return 'good-img'
    }
  }

  return (
    <header className={highestValue()}>
      <h1>{title}</h1>
    </header>
  )
}

export default Header
