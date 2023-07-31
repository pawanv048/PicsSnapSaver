import axios from "axios";

export const baseUrl = 'https://api.unsplash.com';
export const accessKey = '2AcrWZYCjK2U6P0vYywu1gqzdqLtNwQORxhYX2qJnrg'; 

//Access-key = 2AcrWZYCjK2U6P0vYywu1gqzdqLtNwQORxhYX2qJnrg
//Secret key = 8EA_vooBxmYmBAImIrPJSbxI_cQVYH06o6i5-fAVpdw

export const apiCall = async (props) => {
  const { url, params, method, headers, onSuccess, onError } = props
  console.log('url: ' + url);

  let defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Client-ID ${accessKey}`,
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