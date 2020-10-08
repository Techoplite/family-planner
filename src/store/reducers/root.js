import auth from './auth'
import message from './message'
import event from './event'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const root = combineReducers({
    auth: auth,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    message: message,
    event: event
})

export default root