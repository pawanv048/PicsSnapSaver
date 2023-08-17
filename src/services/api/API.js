import axios from "axios";
import { API_KEY } from '@env';


export const baseUrl = 'https://api.unsplash.com';


console.log('API Key:', API_KEY);
// console.log('Secret Key:', SECRET_KEY);


// TESTING KEYS
export const accessKey = 'OoqaimbJkm_RVg13Y3XjSX49clHYIzAXqK1bPfV5qX0'; 
export const BASE_URI = 'https://source.unsplash.com/random?sig=';

//Access-key = OoqaimbJkm_RVg13Y3XjSX49clHYIzAXqK1bPfV5qX0
//Secret key = 3bX31mpv72Wq_nmITnXraeJarlXuTJ75wxY8w6S-kaU

// TESTING KEYS


export const generateCategoriesUrl = () => {
  return `${baseUrl}/topics?&page=1&order_by=oldest&per_page=20`;
};

export const generatePhotosUrl = (title) => {
  return `${baseUrl}/topics/${title}/photos?page=1&per_page=10&order_by=latest`;
};

export const apiCall = async (props) => {
  const { url, params, method, headers, onSuccess, onError } = props
  console.log('url: ' + url);

  let defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Client-ID ${accessKey} `,
  };

  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers || defaultHeaders,
      data: params,
    });
    onSuccess(response.data);
  } catch (err) {
    console.log(err);
    onError(err);
  }
};

const route = {
  
}