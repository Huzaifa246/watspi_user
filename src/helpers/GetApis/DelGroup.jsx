import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function DelGroupApi(id) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/contact/deleteGroup/${id}`;
    console.log('API URL:', url);

    const response = await axios.delete(url, {
      headers: UserHeader,
    });
    console.log('Delete Group API Response:', response);
    const resData = decryption(response?.data?.data);

    console.log(resData);
    return resData;
  } catch (error) {
    console.log('Error At Deleting Group:', error);
    return error;
  }
}

export default DelGroupApi;
