import { RECEIVE_DATA, REQUEST_DATA, ERROR_RECEIVE_DATA, PAGINATION } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    pagination: {},
    error: '',
};

export default function issues(state = INITIAL_STATE, action) {
    switch (action.type) {
    case REQUEST_DATA:
        return {
            ...state,
            loading: true,
        };
    case RECEIVE_DATA:
        return {
            ...state,
            data: action.data,
            error: '',
            loading: false,
        };
    case PAGINATION:
        return {
            ...state,
            pagination: action.pages,
        };
    case ERROR_RECEIVE_DATA:
        return {
            ...INITIAL_STATE,
            error: action.error,
            loading: false,
        };
    default:
        return state;
    }
}
