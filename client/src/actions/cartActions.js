export const addToCart = (biryani, quantity, varient) => (dispatch, getState) => {
    const cartItem = {
        name: biryani.name,
        _id: biryani._id,
        image: biryani.image,
        varient: varient,
        quantity: Number(quantity),
        prices: biryani.prices,
        price: biryani.prices.find(p => p.varient === varient).price * quantity,
        category: biryani.category
    };

    if(cartItem.quantity > 10) {
        alert('You cannot add more than 10 quantities');
        return;
    }
    
    if(cartItem.quantity < 1) {
        dispatch({ type: 'DELETE_FROM_CART', payload: biryani });
    } else {
        dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    }

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const updateCartQuantity = (itemId, quantity) => (dispatch, getState) => {
    if(quantity > 10) {
        alert('You cannot add more than 10 quantities');
        return;
    }
    
    dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
            id: itemId,
            quantity: Number(quantity)
        }
    });

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const deleteFromCart = (biryani) => (dispatch, getState) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: biryani });
    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const clearCart = () => (dispatch) => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cartItems');
};