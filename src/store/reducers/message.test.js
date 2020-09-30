import message from './message'

describe('message reducer', () => {
    const initialState = {
        text: null,
        severity: null
    }
    it('should return the initial state', () => {
        expect(message(undefined, {})).toEqual(initialState)
    })
    it('should handle SET_MESSAGE', () => {
        expect(message(initialState,
            {
                type: 'SET_MESSAGE',
                payload: {
                    text: "this is an error message",
                    severity: "error"
                }
            }
        )).toEqual(
            {
                text: "this is an error message",
                severity: "error"
            }
        )
        expect(message(initialState,
            {
                type: 'SET_MESSAGE',
                payload: {
                    text: "this is an warning message",
                    severity: "warning"
                }
            }
        )).toEqual(
            {
                text: "this is an warning message",
                severity: "warning"
            }
        )
    })
    it('should handle CLEAR_MESSAGE', () => {
        expect(message(initialState,
            {
                type: 'CLEAR_MESSAGE',
                payload: {
                    text: null,
                    severity: null
                }
            }
        )).toEqual(initialState)
        expect(message(
            {
                text: "this is an error message",
                severity: "error"
            },
            {
                type: 'CLEAR_MESSAGE',
                payload: {
                    text: null,
                    severity: null
                }
            }
        )).toEqual(initialState)
    })
})