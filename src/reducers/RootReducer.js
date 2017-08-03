import { combineReducers } from 'redux';
import issues from './issues';

const RootReducer = combineReducers({
    issues,
});

export default RootReducer;
