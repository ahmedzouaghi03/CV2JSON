import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const extractText = async () => {
  const response = await axios.get(`${API_URL}/extract`);
  return response.data;
};
