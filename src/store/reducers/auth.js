const initialState = {
    authError: null,

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
                ...action.payload
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        case 'GET_USER_PROFILE_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        case 'FIND_FAMILY_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        case 'FIND_FAMILY_ERROR':
            return {
                ...state,
                ...action.payload
            }
        case 'RESET_FAMILY':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default user