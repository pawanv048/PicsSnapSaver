import axios from 'axios';
import {API_KEY} from '@env';

export const baseUrl = 'https://api.unsplash.com';

export const BASE_URI = 'https://source.unsplash.com/random?sig=';

//Access-key = OoqaimbJkm_RVg13Y3XjSX49clHYIzAXqK1bPfV5qX0
//Secret key = 3bX31mpv72Wq_nmITnXraeJarlXuTJ75wxY8w6S-kaU

export const generateCategoriesUrl = () => {
  return `${baseUrl}/topics?&page=1&order_by=popular&per_page=20`;
};

export const generatePhotosUrl = title => {
  return `${baseUrl}/topics/${title}/photos?page=1&per_page=10&order_by=latest`;
};

// Function to get a random API key
function getRandomApiKey() {
  const randomIndex = Math.floor(Math.random() * API_KEY.length);
  return API_KEY[randomIndex];
}

const randomApiKey = getRandomApiKey();
// console.log('Random API Key:', randomApiKey);


export const apiCall = async props => {
  const {url, params, method, headers, onSuccess, onError} = props;
  // console.log('url: ' + url);

  let defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Client-ID ${randomApiKey} `,
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

const route = {};
