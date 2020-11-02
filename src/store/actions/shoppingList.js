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