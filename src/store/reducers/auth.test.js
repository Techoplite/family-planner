import user from './auth'

describe("auth reducer", () => {
    const initialState = {
        authError: null,
        redirectPath: null,
    }
    it('should return the initial state', () => {
        expect(user(undefined, {})).toEqual(initialState)
    })
    it('should handle LOGIN_SUCCESS', () => {
        expect(user(initialState,
            {
                type: 'LOGIN_SUCCESS',
                payload: {
                    authError: null,
                    redirectPath: null,
                }
            }
        )).toEqual(initialState)
    })
    it('should handle LOGIN_ERROR', () => {
        expect(user(initialState,
            {
                type: 'LOGIN_ERROR',
                payload: {
                    authError: "This is an error message",
                    redirectPath: null,
                }
            }
        )).toEqual(
            {
                authError: "This is an error message",
                redirectPath: null,
            }
        )
    })
    it('should handle LOGOUT_SUCCESS', () => {
        expect(user(
            {
                authError: null,
                capitalisedName: "John",
                email: "john@email.com",
                color: "blue",
                surname: "Doe"
            },
            {
                type: 'LOGOUT_SUCCESS',
                payload: {
                    authError: null,
                    redirectPath: null,
                }
            }
        )).toEqual(
            {
                authError: null,
                redirectPath: null,
            }
        )
    })
    it('should handle SIGNUP_SUCCESS', () => {
        expect(user(initialState,
            {
                type: 'SIGNUP_SUCCESS',
                payload: {
                    authError: null,
                    redirectPath: null,
                    capitalisedName: "John",
                    email: "john@email.com",
                    color: "blue",
                    surname: "Doe"
                }
            }
        )).toEqual(
            {
                authError: null,
                redirectPath: null,
                capitalisedName: "John",
                email: "john@email.com",
                color: "blue",
                surname: "Doe"
            }
        )
    })
    it('should handle SIGNUP_ERROR', () => {
        expect(user(initialState,
            {
                type: 'SIGNUP_ERROR',
                payload: {
                    authError: "This is an error message",
                    redirectPath: null,
                }
            }
        )).toEqual(
            {
                authError: "This is an error message",
                redirectPath: null,
            }
        )
    })
    it('should handle GET_USER_PROFILE_SUCCESS', () => {
        expect(user(initialState,
            {
                type: 'GET_USER_PROFILE_SUCCESS',
                payload: {
                    name: 'John',
                    email: 'john@email.com',
                    color: 'blue'
                }
            }
        )).toEqual(
            {
                authError: null, // this should come from the initial state
                redirectPath: null,
                name: 'John',
                email: 'john@email.com',
                color: 'blue'
            }
        )
    })
    it('should handle FIND_FAMILY_SUCCESS', () => {
        expect(user(initialState,
            {
                type: "FIND_FAMILY_SUCCESS",
                payload: {
                    availableFamily: 'Doe',
                    authError: null
                }
            }
        )).toEqual(
            {
                availableFamily: 'Doe',
                authError: null,
                redirectPath: null,
            }
        )
    })
    it('should handle FIND_FAMILY_ERROR', () => {
        expect(user(initialState,
            {
                type: "FIND_FAMILY_ERROR",
                payload: {
                    availableFamily: null,
                    authError: "This is an error message",
                    redirectPath: null,
                }
            }
        )).toEqual(
            {
                availableFamily: null,
                authError: "This is an error message",
                redirectPath: null,
            }
        )
    })
    it('should handle RESET_FAMILY', () => {
        expect(user(
            {
                availableFamily: 'Doe',
                authError: null
            },
            {
                type: "RESET_FAMILY",
                payload: {
                    availableFamily: false,
                    authError: null,
                    redirectPath: null,
                }
            }
        )).toEqual(
            {
                availableFamily: false,
                authError: null,
                redirectPath: null,
            }
        )
    })
    it('should handle PASSWORD_ALREADY_TAKEN', () => {
        expect(user(initialState,
            {
                type: "PASSWORD_ALREADY_TAKEN",
                payload: {
                    authError: "Password already taken",
                    redirectPath: null,

                }
            }
        )).toEqual(
            {
                authError: "Password already taken",
                redirectPath: null,
            }
        )
    })
    it('should handle PASSWORD_NEEDED', () => {
        expect(user(initialState,
            {
                type: "PASSWORD_NEEDED",
                payload: {
                    authError: "Password needed",
                    redirectPath: null,
                }
            }
        )).toEqual(
            {
                authError: "Password needed",
                redirectPath: null,
            }
        )
    })
})