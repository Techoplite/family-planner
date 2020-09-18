const initialState = {
    authError: null
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                ...action.payload
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default user