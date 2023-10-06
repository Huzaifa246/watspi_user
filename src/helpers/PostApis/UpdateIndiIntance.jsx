import axios from 'axios';
async function UpdateInstanceApi(data) {
    try {
        console.log('Request Data:', data);
        const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/users/Update_instance`,
            data);

        console.log(response, "res")
        return response;
    } catch (error) {
        console.error('Error From Create Instance API:', error);
        return error;
    }
}

export default UpdateInstanceApi;
