import { ERROR_RECEIVE_DATA, RECEIVE_DATA, REQUEST_DATA, PAGINATION } from './types';
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

function pagination(pages) {
    return {
        type: PAGINATION,
        pages,
    };
}

function paginationParser(link) {
    const pages = {};
    link.split(', ')
        .map((item) => {
            return item.split('; ')
                .map((i) => {
                    if (i.indexOf('rel') !== -1) {
                        return i.slice(i.indexOf('=') + 1)
                                .slice(1, -1);
                    }
                    return i.slice(i.lastIndexOf('=') + 1, -1);
                })
                .reduce((prev, current) => {
                    pages[current] = +prev;
                });
        });
    return pages;
}

function getQueryString(params) {
    const encode = encodeURIComponent;
    return Object.keys(params)
        .map(k => `${encode(k)}=${encode(params[k])}`)
        .join('&');
}

function getUrl(url, queryParams) {
    if (Object.keys(queryParams).length > 0) {
        return `${url}?${getQueryString(queryParams)}`;
    }
    return url;
}


export default function fetchData(url, params = {
    per_page: 30,
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
            .then(response => {
                let link = response.headers.get('link', null);
                dispatch(pagination(paginationParser(link)));
                return response.json();
            })
            .then(response => dispatch(receive(response)))
            .catch(error => dispatch(errorReceive(error)));
    };
}
