import { ERROR_RECEIVE_DATA, RECEIVE_DATA, REQUEST_DATA } from './types';
import settings from '../config/settings';

function request() {
    return {
        type: REQUEST_DATA,
    };
}

function receive(json) {
    return {
        type: RECEIVE_DATA,
        data: json,
    };
}

function errorReceive(error) {
    return {
        type: ERROR_RECEIVE_DATA,
        error,
    };
}

function getQueryString(params) {
    const encode = encodeURIComponent;
    return Object.keys(params)
        .map(k => `${encode(k)}=${encode(params[k])}`)
        .join('&');
}

const getUrl = (url, queryParams) => {
    if (Object.keys(queryParams).length > 0) {
        return `${url}?${getQueryString(queryParams)}`;
    }
    return url;
};

export default function fetchData(url, params = {
    per_page: 1,
    page: 2,
}) {
    return (dispatch) => {
        dispatch(request());
        return fetch(getUrl(settings.BASE_URL + url, params))
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }
                const error = new Error(response.error);
                error.response = response;
                throw error;
            })
            .then(response => {let link = response.headers.get('link', null); console.log(link);debugger; return response.json()})
            .then(response => dispatch(receive(response)))
            .catch(error => dispatch(errorReceive(error)));
    };
}
