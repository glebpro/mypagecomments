import {combineReducers} from 'redux';
import UserReducer from './user-reducer';
import DefaultUser from './user-default';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    user: UserReducer,
    defaultuser: DefaultUser
});

export default allReducers;
