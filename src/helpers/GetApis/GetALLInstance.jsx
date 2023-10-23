import axios from 'axios';
async function GetALLInstances(userId) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/getinstance/${userId}`;
    console.log(url);

    const response = await axios.get(url);
    const resData = response?.data;

    console.log(resData);
    return resData;
  } catch (error) {
    console.error('Error fetching data at Past Trade:', error);
    return [];
  }
}

export default GetALLInstances;
