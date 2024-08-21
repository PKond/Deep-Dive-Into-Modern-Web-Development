import axios from "axios";
const Url = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(Url);
  return request.then((response) => response.data);
};

export default {
  getAll
};
