import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.BACKEND_URL
  : 'http://localhost:3333/v1/';

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
