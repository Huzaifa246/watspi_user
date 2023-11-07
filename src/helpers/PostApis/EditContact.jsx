import axios from 'axios';
import { decryption, encryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function EditContactApi(data, id) {
    try {
        console.log('Request Data:', data);
        const encrypted = encryption(data)
        console.log(encrypted, "encrypted data")
        const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/contact/updateContact/${id}`,
            { data: encrypted },
            {
                headers: UserHeader,
            });

        const decryptedData = await decryption(response?.data?.data);
        console.log(decryptedData, "Updated res")
        return decryptedData;
    } catch (error) {
        console.error('Error From Edit Contact API:', decryption(error?.response?.data?.data));
        return error;
    }
}

export default EditContactApi;
