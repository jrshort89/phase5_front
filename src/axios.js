import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://phase5-deploy.herokuapp.com/',
    // withCredentials: true
});

export default instance;
