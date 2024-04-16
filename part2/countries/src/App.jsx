import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import countriesServices from './services/countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    countriesServices
      .getCountries()
      .then(returnCountries => {
        setCountries(returnCountries)
      })
      .catch (error => {console.log(error)})
  }, [])

  useEffect(() => {
    console.log('weather effect')
    if (countries[0]) {
      countriesServices
        .getWeather(countries[0].capitalInfo.latlng[0],countries[0].capitalInfo.latlng[1])
        .then(returnWeather => {
          setWeather(returnWeather)
          console.log('temp:',returnWeather.main.temp)
        })
        .catch (error => {console.log(error)})
    }
  }, [filter])


  const selectCountry = (cca2) => {
    const selectedCountry = countries.find(country => country.cca2 === cca2)
    setFilter(selectedCountry.name.common)
  }

  const countryToShow = (filter=='')
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter value={filter} setFilter={setFilter}/>
      <Countries countries={countryToShow} selectCountry={selectCountry} weather={weather} setWeather={setWeather}/>
    </div>
  )
  
}

export default App