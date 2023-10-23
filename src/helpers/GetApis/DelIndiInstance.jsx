import axios from 'axios';
async function DelIndiInstance(InstanceID) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/deleteInstanceAccount/${InstanceID}`;
    console.log(url);

    const response = await axios.delete(url);
    const resData = response?.data;

    console.log(resData);
    return resData;
  } catch (error) {
    console.error('Error At Deleting Instance:', error);
    return [];
  }
}

export default DelIndiInstance;
