import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1";

const weatherApi = axios.create({
  baseURL: BASE_URL,
});

export default weatherApi;
