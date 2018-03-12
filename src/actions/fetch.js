import axios from 'axios';
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

function getPageQuantity(link) {
    const pages = {};
    link.split(', ')
        .map(item =>
                item.split('; ')
                    .map((i) => {
                        if (i.indexOf('rel') !== -1) {
                            return i.slice(i.indexOf('=') + 1)
                                .slice(1, -1);
                        }
                        return i.slice(i.lastIndexOf('=') + 1, -1);
                    })
                    /* eslint-disable array-callback-return */
                    .reduce((prev, current) => {
                        pages[current] = +prev;
                    }),
                    /* eslint-enable array-callback-return */
        );
    return pages;
}


export default function fetchData(url, params) {
    return (dispatch) => {
        dispatch(request());
        return axios.get(settings.BASE_URL + url, { params })
            .then((response) => {
                dispatch(pagination(getPageQuantity(response.headers.link)));
                dispatch(receive(response.data));
            })
            .catch(error => dispatch(errorReceive(error)));
    };
}
