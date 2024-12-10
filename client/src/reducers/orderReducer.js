export const placeOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case 'PLACE_ORDER_REQUEST':
            return {
                loading: true
            }
        case 'PLACE_ORDER_SUCCESS':
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case 'PLACE_ORDER_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        case 'PLACE_ORDER_RESET':
            return {}
        default:
            return state
    }
}

export const getUserOrdersReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case 'GET_USER_ORDERS_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'GET_USER_ORDERS_SUCCESS':
            return {
                loading: false,
                orders: action.payload
            }
        case 'GET_USER_ORDERS_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderStatusReducer = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_ORDER_STATUS_REQUEST':
            return {
                loading: true
            }
        case 'UPDATE_ORDER_STATUS_SUCCESS':
            return {
                loading: false,
                success: true
            }
        case 'UPDATE_ORDER_STATUS_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}