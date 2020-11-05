import { setMessage } from './message'

export const addTodoItem = (itemToAdd, id, familyPassword) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection("families").where("family.password", "==", familyPassword).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const family = doc.data().family
                    const familyDOCRef = doc.ref
                    family.todoItems.push({
                        id,
                        text: itemToAdd
                    })
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
            .then(() => {
                dispatch({
                    type: "ADD_TODO_ITEM_SUCCESS",
                    payload: {
                        id,
                        text: itemToAdd

                    }
                })
                dispatch(
                    setMessage("To-do item successfully added.", "success")
                )
            }).catch(function (error) {
                console.log("Transaction failed: ", error);
            });
    }
}

export const updateTodoList = (todoItems, familyPassword) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection("families").where("family.password", "==", familyPassword).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const familyDOCRef = doc.ref
                    familyDOCRef.update({
                        "family.todoItems": todoItems
                    })

                })
            })
            .then(() => {
                dispatch({
                    type: "UPDATE_TODO_LIST_SUCCESS",
                    payload: {
                        todoItems
                    }
                })
                dispatch(
                    setMessage("To-do list successfully updated.", "success")
                )
            }).catch(function (error) {
                console.log("Transaction failed: ", error);
            });
    }
}