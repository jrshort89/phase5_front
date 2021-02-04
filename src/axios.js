import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://phase5-deploy.herokuapp.com/',
});

export default instance;
