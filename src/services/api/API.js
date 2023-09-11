import axios from 'axios';
import {API_KEY} from '@env';

// import {apiKeys} from '@env';

export const baseUrl = 'https://api.unsplash.com';

export const BASE_URI = 'https://source.unsplash.com/random?sig=';

// const apiKeys = [
//   {
//     API_KEY: '2AcrWZYCjK2U6P0vYywu1gqzdqLtNwQORxhYX2qJnrg',
//     SECRET_KEY: '8EA_vooBxmYmBAImIrPJSbxI_cQVYH06o6i5-fAVpdw',
//   },
//   {
//     API_KEY: 'OoqaimbJkm_RVg13Y3XjSX49clHYIzAXqK1bPfV5qX0',
//     SECRET_KEY: '3bX31mpv72Wq_nmITnXraeJarlXuTJ75wxY8w6S-kaU',
//   },
//   {
//     API_KEY: 'zPcMHh5mHe2oGTeUpXDn9TIKdt_9tx14odPnbAJ5bv0',
//     SECRET_KEY: 'ysxlpsGHecXJwguyMM9xWVpL0ujZdBXuNrzbRR27o9g',
//   },
//   {
//     API_KEY: 'I8TEn3rJDVrqtUMIw3h8RkuGe8HEnFHXVV_wQyMERDo',
//     SECRET_KEY: 'TtwXNMXmJKhVxq6kPpOlsGacgsi54wPd15vEkyTU51E',
//   },
// ];

export const generateCategoriesUrl = () => {
  return `${baseUrl}/topics?&page=1&order_by=popular&per_page=20`;
};

export const generatePhotosUrl = title => {
  return `${baseUrl}/topics/${title}/photos?page=1&per_page=10&order_by=latest`;
};

// Function to get a random API key
// function getRandomApiKey() {
//   const randomIndex = Math.floor(Math.random() * API_KEY.length);
//   return API_KEY[randomIndex];
// }

// const randomIndex = Math.floor(Math.random() * apiKeys.length);
// const selectedApiKey = apiKeys[randomIndex];

// console.log('Selected API Key:', selectedApiKey.API_KEY);
// console.log('Selected Secret Key:', selectedApiKey.SECRET_KEY);

// const randomApiKey = getRandomApiKey();
// console.log('Random API Key:', randomApiKey);


export const apiCall = async props => {
  const {url, params, method, headers, onSuccess, onError} = props;
  // console.log('url: ' + url);

  let defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Client-ID ${API_KEY} `,
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
