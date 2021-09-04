import axios from 'axios';

const instance = axios.create({
    baseURL: "https://mk-to-do-list.herokuapp.com/"
    // baseURL: "http://localhost:5000"
})

export default instance;