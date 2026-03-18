
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getPools = () => axios.get(`${BASE_URL}/pools`);
export const getRecommendation = () => axios.get(`${BASE_URL}/pools/recommendation`);
export const getInvestments = () => axios.get(`${BASE_URL}/investments`);
export const addInvestment = (data) => axios.post(`${BASE_URL}/investments`, data);
export const deleteInvestment = (id) => axios.delete(`${BASE_URL}/investments/${id}`);