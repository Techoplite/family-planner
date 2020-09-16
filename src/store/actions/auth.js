export const login = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        const email = credentials.email
        const password = credentials.password
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => dispatch(
                {
                    type: 'LOGIN_SUCCESS',
                }
            ))
            .catch((err) => {
                dispatch(
                    {
                        type: 'LOGIN_ERROR',
                        err
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
                    type: 'LOGOUT_SUCCESS'
                }
            ))
        // .catch((err) => {
        //     dispatch({
        //         type: 'LOGOUT_ERROR',
        //         err
        //     })
        // })
    };
}
