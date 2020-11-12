const initialState = {
    authError: null,
    redirectPath: null
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
        case 'FIND_EVENT_TO_EDIT_SUCCESS':
            return {
                ...state,
                eventSelected: action.payload
            }
        case 'EDIT_EVENT_SUCCESS':
            return {
                ...state,
                family: {
                    ...state.family,
                    events:
                        [...state.family.events.filter(event => {
                            return (event.name !== action.payload.eventToEdit.name,
                                event.time !== action.payload.eventToEdit.time,
                                event.date !== action.payload.eventToEdit.date)

                        }), action.payload.eventEdited]
                }
            }
        case 'ADD_SHOPPING_ITEM_SUCCESS':
            return {
                ...state,
                family: {
                    ...state.family,
                    shoppingItems: [...state.family.shoppingItems, action.payload]
                }
            }
        case 'UPDATE_SHOPPING_LIST_SUCCESS':
            return {
                ...state,
                family: {
                    ...state.family,
                    shoppingItems: action.payload.shoppingItems
                }
            }
        case 'ADD_TODO_ITEM_SUCCESS':
            return {
                ...state,
                family: {
                    ...state.family,
                    todoItems: [...state.family.todoItems, action.payload]
                }
            }
        case 'UPDATE_TODO_LIST_SUCCESS':
            return {
                ...state,
                family: {
                    ...state.family,
                    todoItems: action.payload.todoItems
                }
            }
        case 'REDIRECT_PATH':
            return {
                ...state,
                redirectPath: action.payload
            }
        case 'CLEAR_REDIRECT_PATH':
            return {
                ...state,
                redirectPath: action.payload
            }
        default:
            return state
    }
}

export default user