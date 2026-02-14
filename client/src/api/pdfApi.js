import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const pdfApi = {
  extractText: async (formData) => {
    const response = await axios.post(`${API_URL}/extract`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getJSON: async (text) => {
    const response = await axios.post(`${API_URL}/convert/json`, { text });
    return response.data;
  },

  getXML: async (text) => {
    const response = await axios.post(`${API_URL}/convert/xml`, { text });
    return response.data;
  }
};