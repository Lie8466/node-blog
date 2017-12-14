import axios from 'axios';
import qs from 'querystring';
import apiHost from './getApiHost';

export default (setting = {}) => {
    const defaultSetting = {
        method: 'get',
        baseURL: apiHost.host,
        withCredentials: true,
        crossDomain: true,
        xDomain: true
    };
    let option;

    option = Object.assign({}, defaultSetting, setting);
    if (option.headers && option.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        option.data = qs.stringify(option.data);
    }
    return axios(option).then((res) => {
        if (res.data.status === 0) {
            return res.data;
        }
        throw res.data;
    }, () => {
        throw {
            message: '网络错误'
        };
    });
};
