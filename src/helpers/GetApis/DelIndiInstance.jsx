import axios from 'axios';
import { decryption } from '../encryptionDecryption';
async function DelIndiInstance(InstanceID) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/deleteInstanceAccount/${InstanceID}`;
    console.log(url);

    const response = await axios.delete(url);
    const resData = decryption(response?.data?.data);

    console.log(resData);
    return resData;
  } catch (error) {
    console.error('Error At Deleting Instance:', error);
    return [];
  }
}

export default DelIndiInstance;
