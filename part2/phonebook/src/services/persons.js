import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const removePerson = (id) => {
  const request = axios.delete(baseUrl.concat(`/${id}`));
  return request.then((response) => response.data);
};

const replaceNumber = (id, newObject) => {
  const request = axios.put(baseUrl.concat(`/${id}`), newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, removePerson, replaceNumber };
