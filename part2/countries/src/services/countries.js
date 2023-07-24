import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAll = () => {
  const request = axios.get(baseUrl.concat("all"));
  return request.then((response) => response.data);
};

const getWeather = (apiKey, city, cc2) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${cc2}&APPID=${apiKey}`
  );
  return request.then((response) => response.data);
};

export default { getAll, getWeather };
