import axios from 'axios';

const API_KEY = '3JKNpjDNxYVT2KvgKSKuqxqCWWkFgQfL';
const baseURL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed';

export const fetchArticles = (period = 7) => {
  return axios.get(`${baseURL}/${period}.json?api-key=${API_KEY}`);
};
