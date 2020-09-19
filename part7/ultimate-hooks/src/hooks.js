import { useState, useEffect } from 'react'
import services from './services'

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

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    services
      .getAll(baseUrl)
      .then(res => setResources(res))
      .catch(e => console.log(e))
  }, [baseUrl])

  const create = resource => {
    services
      .create(baseUrl, resource)
      .then(res => setResources([...resources].concat(res)))
      .catch(e => console.log(e))
  }

  const service = {
    create,
  }

  return [resources, service]
}

export { useField, useResource }
