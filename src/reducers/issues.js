import { RECEIVE_DATA, REQUEST_DATA, ERROR_RECEIVE_DATA, PAGINATION } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    pagination: {},
};

export default function issues(state = INITIAL_STATE, action) {
    switch (action.type) {
    case REQUEST_DATA:
        return {
            ...state,
        };
    case RECEIVE_DATA:
        return {
            ...state,
            data: action.data,
        };
    case PAGINATION:
        return {
            ...state,
            pagination: action.pages,
        };
    case ERROR_RECEIVE_DATA:
        return {
            ...state,
            ...INITIAL_STATE,
        };
    default:
        return state;
    }
}
