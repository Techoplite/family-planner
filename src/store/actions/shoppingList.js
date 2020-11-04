import { setMessage } from './message'

export const addShoppingItem = (state, familyPassword) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        const { itemName, shop, quantity } = state
        firestore.collection("families").where("family.password", "==", familyPassword).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const family = doc.data().family
                    const familyDOCRef = doc.ref
                    family.shoppingItems.push({
                        itemName, shop, quantity
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
                    type: "ADD_SHOPPING_ITEM_SUCCESS",
                    payload: {
                        itemName, shop, quantity
                    }
                })
                dispatch(
                    setMessage("Shopping item successfully added to family shopping list.", "success")
                )
            }).catch(function (error) {
                console.log("Transaction failed: ", error);
            });
    }
}

export const updateShoppingList = (shoppingItems, familyPassword) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection("families").where("family.password", "==", familyPassword).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    const familyDOCRef = doc.ref
                    familyDOCRef.update({
                        "family.shoppingItems": shoppingItems
                    })
                   
                })
            })
            .then(() => {
                dispatch({
                    type: "UPDATE_SHOPPING_LIST_SUCCESS",
                    payload: {
                        shoppingItems
                    }
                })
                dispatch(
                    setMessage("Shopping list successfully updated.", "success")
                )
            }).catch(function (error) {
                console.log("Transaction failed: ", error);
            });
    }
}