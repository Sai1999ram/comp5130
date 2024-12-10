import axios from 'axios';

// Register User
export const registerUser = (user) => async dispatch => {
    dispatch({ type: 'USER_REGISTER_REQUEST' });
    try {
        const response = await axios.post('/api/users/register', user);
        dispatch({ 
            type: 'USER_REGISTER_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({ 
            type: 'USER_REGISTER_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
};

// Login User
export const loginUser = (user) => async dispatch => {
    dispatch({ type: 'USER_LOGIN_REQUEST' });
    try {
        const response = await axios.post('/api/users/login', user);
        dispatch({ 
            type: 'USER_LOGIN_SUCCESS',
            payload: response.data 
        });
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        window.location.href = '/';
    } catch (error) {
        dispatch({ 
            type: 'USER_LOGIN_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
};

// Logout User
export const logoutUser = () => dispatch => {
    localStorage.removeItem('currentUser');
    dispatch({ type: 'USER_LOGOUT' });
    window.location.href = '/login';
};

// Update Profile
export const updateProfile = (userData) => async (dispatch, getState) => {
    dispatch({ type: 'USER_UPDATE_PROFILE_REQUEST' });
    try {
        const { loginUserReducer: { currentUser } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        };

        const response = await axios.put('/api/users/profile', userData, config);
        dispatch({ 
            type: 'USER_UPDATE_PROFILE_SUCCESS',
            payload: response.data
        });
        localStorage.setItem('currentUser', JSON.stringify({
            ...currentUser,
            ...response.data
        }));
    } catch (error) {
        dispatch({ 
            type: 'USER_UPDATE_PROFILE_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
};

// Add Address
export const addAddress = (address) => async (dispatch, getState) => {
    dispatch({ type: 'USER_ADD_ADDRESS_REQUEST' });
    try {
        const { loginUserReducer: { currentUser } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        };

        const response = await axios.post('/api/users/address', address, config);
        dispatch({ 
            type: 'USER_UPDATE_ADDRESS',
            payload: response.data.addresses
        });
        
        // Update local storage
        const updatedUser = {
            ...currentUser,
            addresses: response.data.addresses
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (error) {
        dispatch({ 
            type: 'USER_ADD_ADDRESS_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
};