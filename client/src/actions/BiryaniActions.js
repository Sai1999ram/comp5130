import axios from "axios";

export const getAllBiryanis = () => async dispatch => {
    dispatch({ type: 'GET_BIRYANIS_REQUEST' });
    try {
        const response = await axios.get('/api/biryani/getall');
        dispatch({ 
            type: 'GET_BIRYANIS_SUCCESS', 
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: 'GET_BIRYANIS_FAILED', 
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        });
    }
};

// Add biryani by category
export const getBiryanisByCategory = (category) => async dispatch => {
    dispatch({ type: 'GET_BIRYANIS_BY_CATEGORY_REQUEST' });
    try {
        const response = await axios.get(`/api/biryani/category/${category}`);
        dispatch({ 
            type: 'GET_BIRYANIS_BY_CATEGORY_SUCCESS', 
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: 'GET_BIRYANIS_BY_CATEGORY_FAILED', 
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        });
    }
};

// Search biryanis
export const searchBiryanis = (searchQuery) => async dispatch => {
    dispatch({ type: 'SEARCH_BIRYANIS_REQUEST' });
    try {
        const response = await axios.get(`/api/biryani/search?query=${searchQuery}`);
        dispatch({ 
            type: 'SEARCH_BIRYANIS_SUCCESS', 
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: 'SEARCH_BIRYANIS_FAILED', 
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        });
    }
};