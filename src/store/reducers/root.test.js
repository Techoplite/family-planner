import root from './root'

describe("root reducer", () => {
    const prevState = {}
    const initialisedAuthReducer = { "authError": null, "redirectPath": null }
    const initialisedFirestoreReducer = { "composite": undefined, "data": {}, "errors": { "allIds": [], "byQuery": {} }, "listeners": { "allIds": [], "byId": {} }, "ordered": {}, "queries": {}, "status": { "requested": {}, "requesting": {}, "timestamps": {} } }
    const initialisedFirebaseReducer = { "auth": { "isEmpty": true, "isLoaded": false }, "authError": null, "data": {}, "errors": [], "isInitializing": false, "listeners": { "allIds": [], "byId": {} }, "ordered": {}, "profile": { "isEmpty": true, "isLoaded": false }, "requested": {}, "requesting": {}, "timestamps": {} }
    const initialisedMessageReducer = { "severity": null, "text": null }
    it("should handle auth reducer", () => {
        expect(
            root(prevState, initialisedAuthReducer).auth
        ).toEqual(initialisedAuthReducer);
    });
    it("should handle firestore reducer", () => {
        expect(
            root(prevState, initialisedFirestoreReducer).firestore
        ).toEqual(initialisedFirestoreReducer);
    });
    it("should handle firestore reducer", () => {
        expect(
            root(prevState, initialisedFirebaseReducer).firebase
        ).toEqual(initialisedFirebaseReducer);
    });
    it("should handle message reducer", () => {
        expect(
            root(prevState, initialisedMessageReducer).message
        ).toEqual(initialisedMessageReducer);
    });
});