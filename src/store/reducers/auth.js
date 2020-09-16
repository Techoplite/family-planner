const initialState = {
    authError: null
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                authError: null
            }
        // case 'LOGOUT_ERROR':
        //     return {
        //         ...state,
        //         authError: action.err.message
        //     }
        default:
            return state
    }
}

export default user