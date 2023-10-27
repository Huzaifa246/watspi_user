import axios from 'axios';
import { decryption, encryption } from '../encryptionDecryption';
async function UpdateInstanceApi(data) {
    try {
        console.log('Request Data:', data);
        const encrypted = encryption(data)
        console.log(encrypted, "encrypted data")
        const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/users/Update_instance`,
            { data: encrypted }
        );
        
        const decryptedData = await decryption(response?.data?.data);
        console.log(decryptedData, "Updated res")
        return decryptedData;
    } catch (error) {
        console.error('Error From Create Instance API:', error);
        return error;
    }
}

export default UpdateInstanceApi;
