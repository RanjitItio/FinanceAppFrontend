import axios from 'axios';


const baseURL = 'http://139.59.70.97/'


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