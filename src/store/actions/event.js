import { setMessage } from './message'


export const addEvent = (state, familyPassword, user) => {
    return (dispatch, getState, { getFirestore }) => {

        const firestore = getFirestore()

        const { title, date, time, location, membersAttending } = state

        firestore.collection("families").where("family.password", "==", familyPassword).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const family = doc.data().family
                    const familyDOCRef = doc.ref
                    family.events.push({
                        title,
                        date,
                        time,
                        location,
                        membersAttending,
                        family: familyPassword,
                        user
                    })
                    console.log('family :>> ', family);
                    console.log('familyDOCRef :>> ', familyDOCRef);
                    firestore.runTransaction(transaction => {
                        return transaction.get(familyDOCRef)
                            .then(doc => {
                                doc.exists &&
                                    transaction.set(familyDOCRef, {
                                        family
                                    }
                                    )
                            })
                    })
                })
            })

        // .then(() => {
        //     dispatch({
        //         type: "ADD_EVENT_SUCCESS",
        //         payload:
        //         {
        //             title,
        //             date,
        //             time,
        //             location,
        //             membersAttending,
        //             family,
        //             user
        //         }
        //     })
        // })
    }
}