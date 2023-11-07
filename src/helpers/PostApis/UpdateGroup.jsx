import axios from 'axios';
import { decryption, encryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function UpdateGroupApi(data) {
    try {
        console.log('Request Data:', data);
        const encrypted = encryption(data)
        console.log(encrypted, "encrypted data")
        const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/contact/updateGroup`,
            { data: encrypted },
            {
                headers: UserHeader,
            });

        const decryptedData = await decryption(response);
        console.log(decryptedData, "Updated res at Group")
        return decryptedData;
    } catch (error) {
        console.error('Error From update Group API:', decryption(error?.response?.data?.data));
        return error;
    }
}

export default UpdateGroupApi;
