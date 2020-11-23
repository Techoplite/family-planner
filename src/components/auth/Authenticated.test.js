import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'
import firebase from './../../config/firebase'
import { createMount } from '@material-ui/core/test-utils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CustomButton from '../inputs/CustomButton';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Authenticated from './Authenticated'
import { BrowserRouter as Router } from 'react-router-dom';




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    auth: {
        userProfile: {
            email: 'testEmail'
        }
    },
    isAddingItem: true,
    itemsToDelete: [{ id: "testId2", text: "testText2" }]
}


const reducer = (state = initialState, action) => {
    return state
}

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebase),
    )
);

configure({ adapter: new Adapter() })

describe('<Authenticated />', () => {
    const mount = createMount()
    const findByDataTest = (dataTestId, numberOfExpectedComponents) => {
        const wrapper = mount(<Router><Authenticated store={store} /></Router>)
        const component = wrapper.find(`[data-testid='${dataTestId}']`)
        return expect(component.length).toBe(numberOfExpectedComponents)
    }
    it('should render a single HTML "familyImage" img element', () => {
        findByDataTest('familyImage', 1)
    })
    it('should render a single MUI Grid container component with two generated children', () => {
        findByDataTest('grid-container', 3)
    })
    it('should render three MUI Grid item component with two generated children each', () => {
        findByDataTest('grid-item', 9)
    })
    it('should render three React-Router-DOM Link components with two generated children each', () => {
        findByDataTest('link', 9)
    })
    it('should render three Section components', () => {
        findByDataTest('section', 3)
    })
})