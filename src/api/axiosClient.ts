import axios from "axios";
import { withHdImages } from "./hdImages";
const baseUrl = "https://hiflux-api.mangobeach-29eb5614.ukwest.azurecontainerapps.io/";
//const baseUrl = "http://localhost:5218/"; 
const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
// Serve upscaled product photos wherever the API returns an image URL.
axiosClient.interceptors.response.use((res) => {
  res.data = withHdImages(res.data);
  return res;
});

export default axiosClient;
