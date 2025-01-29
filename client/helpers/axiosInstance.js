import axios from "axios";

const api = axios.create({
  baseURL: 'https://www.hackthebox.eu/api/v4/user/profile/bloods/9001',
});

export default api