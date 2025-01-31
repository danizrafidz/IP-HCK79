import axios from "axios";

const api = axios.create({
  baseURL: 'https://server.danizrafidz.my.id/',
});

export default api