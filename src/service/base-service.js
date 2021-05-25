import get from 'lodash/get';
import axiosLib from 'axios';

import AppConfig from '../app-config';
import UserService from "./user-service";

const userService = UserService.factory();

export default class BaseService {
    interceptSuccessResponse = (response) => {
        return {
            ...response,
            data: get(response, 'data')
        }
    }

    interceptFailResponse = (error) => {
        const errors = get(error, 'responce.data', {});
        const errorsArray = Object.keys(errors).map(key => errors[key]);

        return Promise.reject(errorsArray);
    }

    createInstance = () => {
        const _axios = axiosLib.create({
            baseURL: AppConfig.getApiBasePath(),
        })

        _axios.interceptors.response.use(this.interceptSuccessResponse, this.interceptFailResponce);

        return _axios;

    }

    getAxios(config = {singleton: true}) {
        let _axios;

        if (config.singleton === true || config.singleton === undefined) {
            if (BaseService.axious == null) {
                _axios = this.createInstance();
                BaseService.axious = _axios;
            } else {
                _axios = BaseService.axious;
            }
        } else {
            _axios = this.createInstance();
        }

        _axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        _axios.defaults.xsrfCookieName = "csrftoken";

        const isAuth = userService.isAuth();

        if (_axios !== null && isAuth) {
            _axios.defaults.headers.common['Authorization'] = `Token ${userService.getToken()}`;
        }

        return _axios;
    }

    get(url, config) {
        return new Promise((succesFn, errorFn) => {
            this.getAxios().get(url, config).then(succesFn).catch(errorFn);
        });
    }

    post(url, postData) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().get(url, postData).then(successFn).catch(errorFn);
        });
    }

    put(url, putData) {
        return new Promise((successFn, errorFn) => {
            this.getAxios.put(url, putData).then(successFn).catch(errorFn);
        })
    }
}