import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function GetAllGroupsApi() {
    try {
        let url = `${import.meta.env.VITE_APP_API}/api/contact/getAllGroups`;
        console.log(url);

        const response = await axios.get(url, {
            headers: UserHeader,
        });
        console.log(response, "response")
        const data = response.data;
        const decryptedData = data.map(item => decryption(item.data));

        console.log(decryptedData);
        return decryptedData;
    } catch (error) {
        console.error('Error fetching data at GetAllGroupsApi:', decryption(error?.response?.data?.data));
        return error;
    }
}

export default GetAllGroupsApi;
