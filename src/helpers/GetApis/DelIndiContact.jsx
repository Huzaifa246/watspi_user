import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function DelIndiContact(id) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/contact/deleteContact/${id}`;
    console.log('API URL:', url);

    const response = await axios.delete(url, {
      headers: UserHeader,
    });
    console.log('Delete Instance API Response:', response);
    const resData = decryption(response?.data?.data);

    console.log(resData);
    return resData;
  } catch (error) {
    console.log('Error At Deleting Instance:', error);
    return error;
  }
}

export default DelIndiContact;
