import { useState, useEffect } from 'react'
import axios from 'axios'

const useCounter = init => {
  const [value, setValue] = useState(init)

  const increment = event => setValue(value + 1)

  const decrement = event => setValue(value - 1)

  const zero = () => setValue(0)

  return {
    value,
    increment,
    decrement,
    zero,
  }
}

const useNotes = url => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get(url).then(res => setNotes(res.data))
  }, [url])

  return notes
}

export { useCounter, useNotes }
