import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const SearchBar = ({ handleChange }) => {
  return (
    <div>
      Find countries <input onChange={handleChange} />
    </div>
  );
};

const CountryInfo = ({ name, capital, area, languageList, flagUrl }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area} km sq. </p>
      <h3>Languages</h3>
      <ul>
        {languageList.map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={flagUrl} />
    </div>
  );
};

const SearchResult = ({ listArray }) => {
  if (listArray.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  } else if (listArray.length <= 10 && listArray.length > 1) {
    return (
      <div>
        {listArray.map((country) => (
          <p>{country.name.common}</p>
        ))}
      </div>
    );
  } else if (listArray.length == 1) {
    const country = listArray[0];
    const languages = country.languages;
    return (
      <CountryInfo
        name={country.name.common}
        capital={country.capital}
        area={country.area}
        languageList={Object.values(languages)}
        flagUrl={country.flags.png}
      />
    );
  }
};
const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      console.log("promise fulfilled");
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

  console.log(filteredList);

  return (
    <div className="App">
      <SearchBar handleChange={handleInputChange} />
      <SearchResult listArray={filteredList} />
    </div>
  );
};

export default App;
