import * as actions from './message'

describe('messagage action creators', () => {
    it('should handle SET_MESSAGE', () => {
        const text = "test text"
        const severity = "test severity"
        const expectedAction = {
            type: 'SET_MESSAGE',
            payload: {
                text,
                severity
            }
        }
        expect(actions.setMessage(text, severity)).toEqual(expectedAction)
    })
    it('should handle CLEAR_MESSAGE', () => {
        const expectedAction = {
            type: 'CLEAR_MESSAGE',
            payload: {
                text: null,
                severity: null
            }
        }
        expect(actions.clearMessage()).toEqual(expectedAction)
    })
})