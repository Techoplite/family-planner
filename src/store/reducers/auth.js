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
        case 'SIGNUP_ERROR':
            return {
                ...state,
                ...action.payload
            }
        case 'GET_USER_PROFILE_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        case 'GET_USER_FAMILY_SUCCESS':
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
        case 'PASSWORD_ALREADY_TAKEN':
            return {
                ...state,
                ...action.payload
            }
        case 'PASSWORD_NEEDED':
            return {
                ...state,
                ...action.payload
            }
        case 'ADD_EVENT_SUCCESS':
            return {
                ...state,
                family: {
                    ...state.family,
                    events: [...state.family.events, action.payload]
                }
            }
        case 'DELETE_EVENT_SUCCESS':
            return {
                ...state,
                family: {
                    ...state.family,
                    events: [...state.family.events.filter(familyEvent => {
                        return familyEvent !== action.payload
                    })]
                }
            }
        default:
            return state
    }
}

export default user