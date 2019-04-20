import axios from "axios";

const api = axios.create({
  baseURL: "https://app-react-backend.herokuapp.com"
});


export default api;