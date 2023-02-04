import axios from 'axios';
import { baseApiUrl } from '../helpers/consts';

const instance = axios.create({
    baseURL: baseApiUrl,
})


export default instance
