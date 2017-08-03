import { RECEIVE_DATA, REQUEST_DATA, ERROR_RECEIVE_DATA } from '../actions/types';

const INITIAL_STATE = {
    data: [],
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
    case ERROR_RECEIVE_DATA:
        return {
            ...state,
            ...INITIAL_STATE,
        };
    default:
        return state;
    }
}
