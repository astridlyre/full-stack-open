import { useState, useEffect } from 'react'
import { getCountry } from './services'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      getCountry(name)
        .then(res => setCountry({ data: res[0], found: true }))
        .catch(setCountry({ data: null, found: false }))
    }
  }, [name])

  return country
}

export { useField, useCountry }
