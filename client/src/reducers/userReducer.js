export const registerUserReducer = (state = {}, action) => {
    switch(action.type) {
        case 'USER_REGISTER_REQUEST':
            return {
                loading: true
            }
        case 'USER_REGISTER_SUCCESS':
            return {
                loading: false,
                success: true,
                user: action.payload
            }
        case 'USER_REGISTER_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        case 'USER_REGISTER_RESET':
            return {}
        default:
            return state
    }
}

export const loginUserReducer = (state = {}, action) => {
    switch(action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loading: true
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loading: false,
                success: true,
                currentUser: action.payload
            }
        case 'USER_LOGIN_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        case 'USER_LOGOUT':
            return {}
        case 'USER_UPDATE_PROFILE':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload
                }
            }
        case 'USER_UPDATE_ADDRESS':
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    addresses: action.payload
                }
            }
        default:
            return state
    }
}