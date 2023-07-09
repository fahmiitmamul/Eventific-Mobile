import axios from 'axios';
import {BACKEND_URL} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const URL = BACKEND_URL;
  console.log(BACKEND_URL);
  return axios.create({
    headers,
    baseURL: URL,
  });
};

export default http;
