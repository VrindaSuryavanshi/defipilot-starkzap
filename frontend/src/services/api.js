import axios from "axios";

const API = "http://localhost:8080/pools";

export const getRecommendation = () => {
  return axios.get(`${API}/recommendation`);
};