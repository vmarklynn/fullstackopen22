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
  } else if (listArray.length == 1) {
    const country = listArray[0];
    setDisplay(country);
  }
};
const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [displayCountry, setDisplayCountry] = useState(null);

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
          .includes(event.target.value.toLowerCase()),
      ),
    );
  };

  return (
    <div className="App">
      <SearchBar handleChange={handleInputChange} />
      <SearchResult listArray={filteredList} setDisplay={setDisplayCountry} />
      <CountryInfo
        name={displayCountry.name.common}
        capital={displayCountry.capital}
        area={displayCountry.area}
        languageList={Object.values(displayCountry.languages)}
        flagUrl={displayCountry.flags.png}
      />
    </div>
  );
};

export default App;
