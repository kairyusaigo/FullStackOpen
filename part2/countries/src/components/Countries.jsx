import countriesServices from '../services/countries'

const Country = ({name, selectCountry}) => {
  return (
    <div>
      {name} <button onClick={selectCountry}>show</button>
    </div>
  )
}

const Language = ({lang}) => {
  return <li>{lang}</li>
}

const Weather = ({weather, capital}) => {
  const iconUrl = 'https://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png'
  console.log (iconUrl)
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {weather.main.temp} Celcius</div>
      <img src={iconUrl}/>
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

const Countries = ({countries, selectCountry, weather}) => {
  
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>

  } if (countries.length === 1) {
    const country = countries[0]
    const keys = Object.keys(country.languages)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          <div>captial {country.capital}</div>
          <div>area {country.area}</div>
        </div>
        <h3>languages:</h3>
        <ul>{keys.map(key => <Language key={key} lang={country.languages[key]}/>)}</ul>
        <img src={country.flags.png}/>
        <Weather weather={weather} capital={country.capital}/>
      </div>
    )

  } else {
    return (
      <div>
        {countries.map(country => <Country key={country.cca2} name={country.name.common} selectCountry={() => selectCountry(country.cca2)}/>)}
      </div>
    )
  }
}

export default Countries