import { setMessage } from './message'

export const login = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const email = credentials.email
        const password = credentials.password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => dispatch(
                {
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        authError: null,
                    }
                }
            ))
            .then(() => dispatch(
                setMessage("Login successful", "success")
            ))
            .catch((err) => {
                dispatch(
                    {
                        type: 'LOGIN_ERROR',
                        payload: { authError: err.message }
                    })
            })
    };
}

export const logout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signOut()
            .then(() => dispatch(
                {
                    type: 'LOGOUT_SUCCESS',
                    payload: { authErr: null }
                }
            ))
    };
}

export const signup = (credentials, name, color, surname) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        const capitalisedName = toTitleCase(name)
        const email = credentials.email
        const password = credentials.password

        const firebase = getFirebase()
        const firestore = getFirestore()
        const batch = firestore.batch()

        // Create new user
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                var user = firebase.auth().currentUser;

                // Add user email to collection
                const passwords = firestore.collection("passwords").doc()
                batch.set(passwords, { password })

                // Add profile associated to the user
                firestore.collection("profiles").doc(user.uid).set({
                    name: capitalisedName,
                    email,
                    color,
                })

                // Join family
                if (surname === "") {
                    firestore.collection("families").where("family.password", "==", password).get()
                        .then(snapshot => {
                            snapshot.docs.forEach(doc => {
                                const familyDOCRef = doc.ref
                                const family = doc.data().family
                                family.members.push(capitalisedName)
                                const updatedAvailableColors = family.availableColors.filter(availableColor => availableColor !== color)
                                family.availableColors = updatedAvailableColors
                                firestore.runTransaction(transaction => {
                                    return transaction.get(familyDOCRef)
                                        .then(doc => {
                                            doc.exists &&
                                                transaction.set(familyDOCRef, {
                                                    family
                                                },
                                                )
                                        })
                                })
                            })
                        })


                }

                // Create new family
                else {
                    const colors = [
                        "red",
                        "blue",
                        "green",
                        "yellow",
                        "orange",
                        "pink",
                        "purple",
                        "teal",
                        "grey",
                    ]
                    const availableColors = colors.filter(availableColor => availableColor !== color)
                    
                    const capitalisedSurname = toTitleCase(surname)
                    const families = firestore.collection("families").doc()
                    batch.set(families, {
                        family: {
                            surname: capitalisedSurname,
                            members: [capitalisedName],
                            password,
                            availableColors
                        }
                    })
                }
                batch.commit()
            })
            .then(() => {
                dispatch(
                    {
                        type: 'SIGNUP_SUCCESS',
                        payload: {
                            authError: null,
                            capitalisedName,
                            email,
                            color,
                            surname
                        }
                    }
                )
                dispatch(
                    setMessage("Sign up successful", "success")
                )
            })
            .catch((error) => {
                dispatch(
                    {
                        type: 'SIGNUP_ERROR',
                        payload: { authError: "Email already taken" }
                    })
                dispatch(
                    setMessage(error.message, "error")
                )
            })
    };
}

export const getUserProfile = (email) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection("profiles").where("email", "==", email).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const data = doc.data()
                    dispatch(
                        {
                            type: 'GET_USER_PROFILE_SUCCESS',
                            payload: {
                                name: data.name,
                                email: data.email,
                                color: data.color
                            }
                        }
                    )
                })
            })

    };
}

export const findFamily = (password) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection("families").where("family.password", "==", password).get()
            .then(snapshot => {
                if (snapshot.docs.length > 0) {
                    snapshot.docs.forEach(doc => {
                        const data = doc.data()
                        if (data.family.members.length > 9) {
                            console.log('data.family.members.length :>> ', data.family.members.length);
                            dispatch({
                                type: "FIND_FAMILY_SUCCESS",
                                payload: {
                                    availableFamily: data.family,
                                    authError: null
                                }
                            })
                        } else {
                            console.log("too many members")

                            dispatch({
                                type: "FIND_FAMILY_ERROR",
                                payload: {
                                    availableFamily: null,
                                    authError: "Maximum number of memebers reached"
                                }
                            })
                            dispatch(
                                setMessage("Maximum number of members reached.", "error")
                            )
                        }
                    })
                } else {
                    dispatch({
                        type: "FIND_FAMILY_ERROR",
                        payload: {
                            availableFamily: null,
                            authError: "No match"
                        }
                    })
                    dispatch(
                        setMessage("The password provided is not associated to any family.", "error")
                    )
                }
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
}

export const resetFamily = () => {
    return (dispatch) => {
        dispatch({
            type: "RESET_FAMILY",
            payload: {
                availableFamily: false,
                authError: null
            }
        })
    }
}

export const passwordAlreadyTaken = () => {
    return (dispatch) => {
        dispatch({
            type: "PASSWORD_ALREADY_TAKEN",
            payload: {
                authError: "Password already taken",

            }
        })
        dispatch(
            setMessage("This password has already been taken.", "error")
        )
    }
}

export const passwordNeeded = () => {
    return (dispatch) => {
        dispatch({
            type: "PASSWORD_NEEDED",
            payload: {
                authError: "Password needed",

            }
        })
        dispatch(
            setMessage("You need to provide your family's password.", "warning")
        )
    }
}