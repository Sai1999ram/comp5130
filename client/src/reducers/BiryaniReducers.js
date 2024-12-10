export const getAllBiryanisReducer = (state = { biryanis: [] }, action) => {
    switch(action.type) {
        case 'GET_BIRYANIS_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'GET_BIRYANIS_SUCCESS':
            return {
                loading: false,
                biryanis: action.payload
            }
        case 'GET_BIRYANIS_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        case 'GET_BIRYANIS_BY_CATEGORY_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'GET_BIRYANIS_BY_CATEGORY_SUCCESS':
            return {
                loading: false,
                biryanis: action.payload
            }
        case 'GET_BIRYANIS_BY_CATEGORY_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        case 'SEARCH_BIRYANIS_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'SEARCH_BIRYANIS_SUCCESS':
            return {
                loading: false,
                biryanis: action.payload
            }
        case 'SEARCH_BIRYANIS_FAILED':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}