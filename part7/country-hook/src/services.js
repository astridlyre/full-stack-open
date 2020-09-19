import axios from 'axios'

const getCountry = async country => {
  const res = await axios.get(
    `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
  )
  return res.data
}

export { getCountry }
