import axios from 'axios';

const REACT_APP_CODESPACE_BACKEND_URL = 'http://localhost:3001/';

const getRouters = async () => axios.get(`${REACT_APP_CODESPACE_BACKEND_URL}/routers`).then(response => response.data);

export {
    getRouters
}