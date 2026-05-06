import axios from "axios";

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/";

const geocodingApi = axios.create({
  baseURL: BASE_URL,
});

export default geocodingApi;
