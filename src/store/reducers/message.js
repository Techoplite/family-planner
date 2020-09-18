const initialState = {
    text: null,
    severity: null
}

const message = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                ...state,
                ...action.payload
            }
        case 'CLEAR_MESSAGE':
            return {
                ...state,
                ...action.payload

            }
        default:
            return state
    }
}

export default message