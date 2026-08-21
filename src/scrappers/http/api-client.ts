// Api

import axios from 'axios';

export const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ScraperBot/1.0',
    Accept: 'application/json,text/html',
  },
});
