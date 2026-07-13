import axios from "axios";
const baseUrl = "https://hiflux-api.mangobeach-29eb5614.ukwest.azurecontainerapps.io/";
//const baseUrl = "http://localhost:5218/"; 
const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
