import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const SearchBar = ({ handleChange }) => {
  return (
    <div>
      Find countries <input onChange={handleChange} />
    </div>
  );
};

const CountryInfo = ({ country }) => {
  if (country === null) {
    return null;
  }
  const languages = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km sq. </p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
};

const SearchResult = ({ listArray, setDisplay }) => {
  if (listArray.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  } else if (listArray.length <= 10 && listArray.length > 1) {
    return (
      <div>
        {listArray.map((country) => (
          <p>
            {country.name.common}{" "}
            <button onClick={() => setDisplay(country)}>Show</button>
          </p>
        ))}
      </div>
    );
  } else if (listArray.length === 1) {
    const country = listArray[0];
    setDisplay(country);
  }
};

const WeatherDisplay = ({ country, weather }) => {
  if (country === null || weather === null) {
    return null;
  }
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather.main.temp} C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather["0"].icon}@2x.png`}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [displayCountry, setDisplayCountry] = useState(null);
  const [displayWeather, setDisplayWeather] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountryList(initialCountries);
    });
  }, []);

  const handleInputChange = (event) => {
    setFilteredList(
      countryList.filter((countries) =>
        countries.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (displayCountry) {
      countriesService
        .getWeather(api_key, displayCountry.capital, displayCountry.cc2)
        .then((weatherData) => {
          setDisplayWeather(weatherData);
        });
    }
  }, [displayCountry]);

  return (
    <div className="App">
      <SearchBar handleChange={handleInputChange} />
      <SearchResult listArray={filteredList} setDisplay={setDisplayCountry} />
      <CountryInfo country={displayCountry} />
      <WeatherDisplay country={displayCountry} weather={displayWeather} />
    </div>
  );
};

export default App;
