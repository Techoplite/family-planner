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
    it('should handle ADD_EVENT_SUCCESS', () => {
        const initialState = {
            family: {
                events: [{
                    title: "Jane's Birthday",
                    date: "26/12/2020",
                    rawDate: "Sat Dec 26 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                    rawTime: "02:25 Am",
                    time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                    location: "Somewhere",
                    membersAttending: [
                        {
                            name: "Jane",
                            email: "jane@email.com",
                            color: "pink"
                        },
                    ],
                    membersNotAttending: [
                        {
                            name: "James",
                            email: "james@email.com",
                            color: "yellow"
                        },
                        {
                            name: "John",
                            email: "john@email.com",
                            color: "blue"
                        },
                    ],
                    family: "doepass1",
                    user: "jane@email.com",
                    noTimeSelected: false,
                    checked: false
                }]
            }
        }
        expect(user(initialState,
            {
                type: "ADD_EVENT_SUCCESS",
                payload:
                {
                    title: "John's Birthday",
                    date: "25/12/2020",
                    rawDate: "Fri Dec 25 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                    rawTime: "02:25 Am",
                    time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                    location: "Somewhere",
                    membersAttending: [
                        {
                            name: "John",
                            email: "john@email.com",
                            color: "blue"
                        },
                        {
                            name: "Jane",
                            email: "jane@email.com",
                            color: "pink"
                        },
                    ],
                    membersNotAttending: [
                        {
                            name: "James",
                            email: "james@email.com",
                            color: "yellow"
                        }
                    ],
                    family: "doepass1",
                    user: "john@email.com",
                    noTimeSelected: false,
                    checked: false
                }
            }
        )).toEqual(
            {
                ...initialState,
                family: {
                    ...initialState.family,
                    events: [...initialState.family.events, {
                        title: "John's Birthday",
                        date: "25/12/2020",
                        rawDate: "Fri Dec 25 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                        rawTime: "02:25 Am",
                        time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                        location: "Somewhere",
                        membersAttending: [
                            {
                                name: "John",
                                email: "john@email.com",
                                color: "blue"
                            },
                            {
                                name: "Jane",
                                email: "jane@email.com",
                                color: "pink"
                            },
                        ],
                        membersNotAttending: [
                            {
                                name: "James",
                                email: "james@email.com",
                                color: "yellow"
                            }
                        ],
                        family: "doepass1",
                        user: "john@email.com",
                        noTimeSelected: false,
                        checked: false
                    }]
                }
            }
        )
    })
    it('should handle DELETE_EVENT_SUCCESS', () => {
        const initialState = {
            family: {
                events: [{
                    title: "Jane's Birthday",
                    date: "26/12/2020",
                    rawDate: "Sat Dec 26 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                    rawTime: "02:25 Am",
                    time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                    location: "Somewhere",
                    membersAttending: [
                        {
                            name: "Jane",
                            email: "jane@email.com",
                            color: "pink"
                        },
                    ],
                    membersNotAttending: [
                        {
                            name: "James",
                            email: "james@email.com",
                            color: "yellow"
                        },
                        {
                            name: "John",
                            email: "john@email.com",
                            color: "blue"
                        },
                    ],
                    family: "doepass1",
                    user: "jane@email.com",
                    noTimeSelected: false,
                    checked: false
                },
                    {
                        title: "John's Birthday",
                        date: "25/12/2020",
                        rawDate: "Fri Dec 25 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                        rawTime: "02:25 Am",
                        time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                        location: "Somewhere",
                        membersAttending: [
                            {
                                name: "John",
                                email: "john@email.com",
                                color: "blue"
                            },
                            {
                                name: "Jane",
                                email: "jane@email.com",
                                color: "pink"
                            },
                        ],
                        membersNotAttending: [
                            {
                                name: "James",
                                email: "james@email.com",
                                color: "yellow"
                            }
                        ],
                        family: "doepass1",
                        user: "john@email.com",
                        noTimeSelected: false,
                        checked: false
                    }]
            }
        }
        const eventToDelete = {
            title: "John's Birthday",
            date: "25/12/2020",
            rawDate: "Fri Dec 25 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
            rawTime: "02:25 Am",
            time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
            location: "Somewhere",
            membersAttending: [
                {
                    name: "John",
                    email: "john@email.com",
                    color: "blue"
                },
                {
                    name: "Jane",
                    email: "jane@email.com",
                    color: "pink"
                },
            ],
            membersNotAttending: [
                {
                    name: "James",
                    email: "james@email.com",
                    color: "yellow"
                }
            ],
            family: "doepass1",
            user: "john@email.com",
            noTimeSelected: false,
            checked: false
        }
        expect(user(initialState,
            
            {
                type: "DELETE_EVENT_SUCCESS",
                payload: eventToDelete
            }
        )).toEqual(
            {
                ...initialState,
                family: {
                    ...initialState.family,
                    events: [...initialState.family.events.filter(familyEvent => {
                        return familyEvent !== {
                            title: "John's Birthday",
                            date: "25/12/2020",
                            rawDate: "Fri Dec 25 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                            rawTime: "02:25 Am",
                            time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                            location: "Somewhere",
                            membersAttending: [
                                {
                                    name: "John",
                                    email: "john@email.com",
                                    color: "blue"
                                },
                                {
                                    name: "Jane",
                                    email: "jane@email.com",
                                    color: "pink"
                                },
                            ],
                            membersNotAttending: [
                                {
                                    name: "James",
                                    email: "james@email.com",
                                    color: "yellow"
                                }
                            ],
                            family: "doepass1",
                            user: "john@email.com",
                            noTimeSelected: false,
                            checked: false
                        }
                    })]
                }
            }
        )
    })
    it('should handle FIND_EVENT_TO_EDIT_SUCCESS', () => {
        const initialState = {
            family: {
                events: [{
                    title: "Jane's Birthday",
                    date: "26/12/2020",
                    rawDate: "Sat Dec 26 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                    rawTime: "02:25 Am",
                    time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                    location: "Somewhere",
                    membersAttending: [
                        {
                            name: "Jane",
                            email: "jane@email.com",
                            color: "pink"
                        },
                    ],
                    membersNotAttending: [
                        {
                            name: "James",
                            email: "james@email.com",
                            color: "yellow"
                        },
                        {
                            name: "John",
                            email: "john@email.com",
                            color: "blue"
                        },
                    ],
                    family: "doepass1",
                    user: "jane@email.com",
                    noTimeSelected: false,
                    checked: false
                },
                    {
                        title: "John's Birthday",
                        date: "25/12/2020",
                        rawDate: "Fri Dec 25 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                        rawTime: "02:25 Am",
                        time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                        location: "Somewhere",
                        membersAttending: [
                            {
                                name: "John",
                                email: "john@email.com",
                                color: "blue"
                            },
                            {
                                name: "Jane",
                                email: "jane@email.com",
                                color: "pink"
                            },
                        ],
                        membersNotAttending: [
                            {
                                name: "James",
                                email: "james@email.com",
                                color: "yellow"
                            }
                        ],
                        family: "doepass1",
                        user: "john@email.com",
                        noTimeSelected: false,
                        checked: false
                    }]
            }
        }
        const eventToEditFound = {
            title: "John's Birthday",
            date: "25/12/2020",
            rawDate: "Fri Dec 25 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
            rawTime: "02:25 Am",
            time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
            location: "Somewhere",
            membersAttending: [
                {
                    name: "John",
                    email: "john@email.com",
                    color: "blue"
                },
                {
                    name: "Jane",
                    email: "jane@email.com",
                    color: "pink"
                },
            ],
            membersNotAttending: [
                {
                    name: "James",
                    email: "james@email.com",
                    color: "yellow"
                }
            ],
            family: "doepass1",
            user: "john@email.com",
            noTimeSelected: false,
            checked: false
        }
        expect(user(initialState,
            {
                type: "FIND_EVENT_TO_EDIT_SUCCESS",
                payload: eventToEditFound
            }
        )).toEqual(
            {
                ...initialState,
                eventSelected: {
                    title: "John's Birthday",
                    date: "25/12/2020",
                    rawDate: "Fri Dec 25 2020 08:50:00 GMT+0000 (Greenwich Mean Time)",
                    rawTime: "02:25 Am",
                    time: "Mon Nov 16 2020 02:25:24 GMT+0000 (Greenwich Mean Time)",
                    location: "Somewhere",
                    membersAttending: [
                        {
                            name: "John",
                            email: "john@email.com",
                            color: "blue"
                        },
                        {
                            name: "Jane",
                            email: "jane@email.com",
                            color: "pink"
                        },
                    ],
                    membersNotAttending: [
                        {
                            name: "James",
                            email: "james@email.com",
                            color: "yellow"
                        }
                    ],
                    family: "doepass1",
                    user: "john@email.com",
                    noTimeSelected: false,
                    checked: false
                }
            }
        )
    })
})