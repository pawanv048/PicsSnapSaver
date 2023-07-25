import axios from "axios";

export const baseUrl = 'https://api.unsplash.com/';

export const apiCall = async (props) => {
  const { url, params, method, headers, onSuccess, onError } = props
  console.log('url: ' + url);

  let defaultHeaders = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
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