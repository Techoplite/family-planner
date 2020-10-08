const initialState = []

const event = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EVENT_SUCCESS':
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}

export default event