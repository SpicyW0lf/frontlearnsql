import axiosLib from 'axios';

import AppConfig from '../app-config';


export default axiosLib.create({
    baseURL: AppConfig.getApiBasePath()
});

export const config = {headers: {
    Authorization: 'Basic cGV0cm92YWRtaW4yOnF3ZXJ0eTEyMzRvb29Q',
}};