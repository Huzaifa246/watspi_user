import axios from 'axios';
async function GetIndiInstance(indiInstance) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/getInstancebyid/${indiInstance}`;
    console.log(url);

    const response = await axios.get(url);
    const resData = response?.data;

    console.log(resData);
    return resData;
  } catch (error) {
    console.error('Error fetching data at GetIndi Instance:', error);
    return [];
  }
}

export default GetIndiInstance;
