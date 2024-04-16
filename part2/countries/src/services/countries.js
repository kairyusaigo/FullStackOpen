import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountries = () => {
  const request = axios.get(countriesUrl)
  return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat='+lat+'&lon='+lon+'&appid='+api_key
  console.log('weatherUrl',weatherUrl)
  const request = axios.get(weatherUrl)
  return request.then(response => response.data)
}


export default { getCountries, getWeather }