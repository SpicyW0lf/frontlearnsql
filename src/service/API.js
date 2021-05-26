import axiosLib from 'axios';

import AppConfig from '../app-config';


export default axiosLib.create({
    baseURL: AppConfig.getApiBasePath()
});