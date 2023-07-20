import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const SearchBar = ({ handleChange }) => {
  return (
    <div>
      Find countries <input onChange={handleChange} />
    </div>
  );
};

const App = () => {
  const [countryName, setCountryName] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      console.log("promise fulfilled");
      setCountryList(initialCountries);
    });
  }, []);

  const handleInputChange = (event) => {
    setCountryName(event.target.value);
    setFilteredList(
      countryList.filter((countries) =>
        countries["name"]["common"]
          .toLowerCase()
          .includes(countryName.toLowerCase())
      )
    );
    console.log(countryName);
  };

  console.log(filteredList);

  return (
    <div className="App">
      <SearchBar handleChange={handleInputChange} />
    </div>
  );
};

export default App;
