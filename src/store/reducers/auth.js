const initialState = {
    authError: null
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log("login success")
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERROR':
            console.log("login error");
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }
}

export default user