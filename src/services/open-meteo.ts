import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1";

const openMeteoApi = axios.create({
  baseURL: BASE_URL,
});

export default openMeteoApi;
