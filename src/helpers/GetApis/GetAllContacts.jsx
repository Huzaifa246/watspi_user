import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function GetAllContacts() {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/contact/getAllContacts`;
    console.log(url);

    const response = await axios.get(url, {
      headers: UserHeader,
    });
    console.log(response, "response")
    const resData = decryption(response?.data?.data);

    console.log(resData);
    return resData;
  } catch (error) {
    console.error('Error fetching data at GetAllContacts:', error);
    return error;
  }
}

export default GetAllContacts;
