import { useState, useEffect } from "react";

const SearchBar = ({ handleChange }) => {
  return (
    <div>
      Find countries <input onChange={handleChange} />
    </div>
  );
};

const App = () => {
  const [countryName, setCountryName] = useState("");

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCountryName(event.target.value);
    console.log(countryName);
  };

  return (
    <div className="App">
      <SearchBar handleChange={handleInputChange} />
    </div>
  );
};

export default App;
