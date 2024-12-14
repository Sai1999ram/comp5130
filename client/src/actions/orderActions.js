import axios from "axios";

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        };

        const response = await axios.post('/api/orders/placeorder', {
            token,
            orderAmount: subtotal,
            currentUser,
            orderItems: cartItems,
            shippingAddress: currentUser.addresses.find(addr => addr.isDefault)
        }, config);

        dispatch({ type: 'PLACE_ORDER_SUCCESS', payload: response.data });
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({ 
            type: 'PLACE_ORDER_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
};

export const getUserOrders = () => async (dispatch, getState) => {
    dispatch({ type: 'GET_USER_ORDERS_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;

    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        };

        const response = await axios.get('/api/orders/myorders', config);
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ 
            type: 'GET_USER_ORDERS_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
};

export const updateOrderStatus = (orderId, status) => async (dispatch, getState) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;

    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${currentUser.token}`
            }
        };

        const response = await axios.put(`/api/orders/${orderId}/status`, { status }, config);
        dispatch({ type: 'UPDATE_ORDER_STATUS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ 
            type: 'UPDATE_ORDER_STATUS_FAILED',
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        });
    }
};