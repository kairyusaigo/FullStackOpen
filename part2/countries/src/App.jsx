import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import countriesServices from './services/countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    countriesServices
      .getAll()
      .then(returnCountries => {
        setCountries(returnCountries)
      })
  }, [])

  const countryToShow = (filter=='')
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter value={filter} setFilter={setFilter}/>
      <Countries countries={countryToShow}/>
    </div>
  )
  
}

export default App