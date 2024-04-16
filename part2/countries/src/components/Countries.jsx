const Country = ({name}) => {
  return <div>{name}</div>
}

const Language = ({lang}) => {
  return <li>{lang}</li>
}

const Countries = ({countries}) => {
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
      </div>
    )
  } else {
    return (
      <div>
        {countries.map(country => <Country key={country.cca2} name={country.name.common} />)}
      </div>
    )
  }
}

export default Countries