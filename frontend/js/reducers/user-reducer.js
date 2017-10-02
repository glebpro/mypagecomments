/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = null, action) {
    switch (action.type) {
        case 'LOG_USER_IN':

            // logging in is the first action the user will take,
            // so wipe the state
            return action.payload;
        case 'LOG_USER_OUT':

            // destory everything!
            return null;
        case 'SET_AVAILABLE_USER_PAGES':

            return Object.assign({}, state, { availablePages: action.payload });
            break;
    }
    return state;
}
