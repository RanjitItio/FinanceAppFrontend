import axios from 'axios';


const baseURL = 'http://localhost:44777/api/'


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'JWT' + localStorage.getItem('access_token')
            : null,
        "Content-Type": "application/json",
        Accept: 'application/json',
    }
});


export default axiosInstance;