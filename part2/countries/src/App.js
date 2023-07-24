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
const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [displayCountry, setDisplayCountry] = useState(null);

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

  if (displayCountry) {
    countriesService
      .getWeather(api_key, displayCountry.capital, displayCountry.cc2)
      .then((weatherData) => {
        console.log(weatherData);
      });
  }

  return (
    <div className="App">
      <SearchBar handleChange={handleInputChange} />
      <SearchResult listArray={filteredList} setDisplay={setDisplayCountry} />
      <CountryInfo country={displayCountry} />
    </div>
  );
};

export default App;
