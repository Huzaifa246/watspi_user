import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function GetALLInstances(userId) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/getinstance/${userId}`;
    console.log(url);

    const response = await axios.get(url, {
      headers: UserHeader,
    });
    const resData = decryption(response?.data?.data);

    console.log(resData);
    return resData;
  } catch (error) {
    console.error('Error fetching data at Past Trade:', error);
    return [];
  }
}

export default GetALLInstances;
