import axios from "axios";

const api = axios.create({
  baseURL: 'https://server.danizrafidz.my.id/',
  // baseURL: 'http://localhost:3000/',
});

export default api