
export const logUserIn = (user) => {
    console.log('You logged in with user: ', user.name);
    return {
        type: 'LOG_USER_IN',
        payload: user
    }
};

export const logUserOut = (user) => {
    console.log('You logged out (should be null)');
    return {
        type: 'LOG_USER_OUT',
        payload: user
    }
};

export const setAvailableUserPages = (pages) => {
  console.log('Set the available user pages to:', pages)
  return {
    type: 'SET_AVAILABLE_USER_PAGES',
    payload: pages
  }
};
