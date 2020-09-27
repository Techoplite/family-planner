import { setMessage } from './message'

export const login = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const email = credentials.email
        const password = credentials.password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => dispatch(
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
        const capitalisedName = name.charAt(0).toUpperCase() + name.slice(1)
        console.log('capitalisedName :>> ', capitalisedName);
        const firebase = getFirebase()
        const email = credentials.email
        const password = credentials.password
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const firestore = getFirestore()
                if (surname === "") {
                    firestore.collection("families").where("family.password", "==", password).get()
                        .then(snapshot => {
                            snapshot.docs.forEach(doc => {
                                const familyDOCRef = doc.ref
                                const family = doc.data().family
                                family.members.push(capitalisedName)
                                console.log('family :>> ', family);
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
                else {
                    const batch = firestore.batch()
                    const families = firestore.collection("families").doc()
                    batch.set(families, {
                        family: {
                            surname,
                            members: [capitalisedName],
                            password
                        }

                    })
                    batch.commit()

                }
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
            .catch((err) => {
                dispatch(
                    {
                        type: 'SIGNUP_ERROR',
                        payload: { authError: err.message }
                    })
                dispatch(
                    setMessage("Ops...something went wrong", "error")
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
        console.log('password', password)
        firestore.collection("families").where("family.password", "==", password).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const data = doc.data()
                    dispatch({
                        type: "FIND_FAMILY_SUCCESS",
                        payload: {
                            availableFamily: data.family.surname
                        }
                    })
                })
            })
    }
}