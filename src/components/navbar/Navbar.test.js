import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './Navbar'
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import root from './../../store/reducers/root'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'
import firebase from './../../config/firebase'
import { BrowserRouter as Router } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';
import Avatar from '@material-ui/core/Avatar';
import CustomButton from '../inputs/CustomButton'
import Message from '../outputs/Message';
import { Typography } from '@material-ui/core'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    root,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebase),
    )
);

configure({ adapter: new Adapter() })

const findByDataTest = (dataTestId, numberOfExpectedComponents) => {
    const wrapper = shallow(<Navbar store={store} />)
    const component = wrapper.dive().dive().dive().find(`[data-test='${dataTestId}']`)
    return expect(component.length).toBe(numberOfExpectedComponents)
}

describe('<Navbar />', () => {

    it('should render a single MUI AppBar component', () => {
        findByDataTest('appBar', 1)
    })
    it('should render a single MUI Toolbar component', () => {
        findByDataTest('toolbar', 1)
    })
    it('should render a single MUI Grid container component', () => {
        findByDataTest('grid-container', 1)
    })
    it('should render two MUI Grid items with xs=2', () => {
        findByDataTest('grid-item-xs2', 2)
    })
    it('should render two React-Router-Dom Link components to="/"', () => {
        findByDataTest('link-to-home', 2)
    })
    it('should render one MUI Slide component', () => {
        findByDataTest('slide', 1)
    })
    it('should render two image HTML elements', () => {
        findByDataTest('image', 2)
    })
    it('should render one MUI Grid item with xs', () => {
        findByDataTest('grid-item-xs', 1)
    })
    it('should render one MUI Zoom component when state.color !== null', () => {
        const initialState = {
            auth: {
                userProfile: { color: "blue", email: "testEmail" },

            },
            message: { text: "testMessage", severity: "success" }
        }
        const auth = (state = initialState, action) => {
            return state
        }
        const store = createStore(
            auth,
            composeEnhancers(
                applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
                reduxFirestore(firebase),
            )
        );
        const wrapper = mount(<Router><Navbar store={store} /></Router>)
        const component = wrapper.find(Zoom)
        return expect(component.length).toBe(1)
    })
    it('should render one MUI Typography component when state.color !== null', () => {
        const initialState = {
            auth: {
                userProfile: { color: "blue", email: "testEmail" },
                family: { surname: "testSurname" }

            },
            message: { text: "testMessage", severity: "success" }
        }
        const auth = (state = initialState, action) => {
            return state
        }
        const store = createStore(
            auth,
            composeEnhancers(
                applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
                reduxFirestore(firebase),
            )
        );
        const wrapper = mount(<Router><Navbar store={store} /></Router>)
        const parentComponent = wrapper.find(Zoom)
        const component = parentComponent.find(Typography)
        return expect(component.length).toBe(1)
    })
    it('should render one MUI Avatar component when user.userProfile', () => {
        const initialState = {
            auth: {
                userProfile: { color: "blue", email: "testEmail" },

            },
            message: { text: "testMessage", severity: "success" }
        }
        const auth = (state = initialState, action) => {
            return state
        }
        const store = createStore(
            auth,
            composeEnhancers(
                applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
                reduxFirestore(firebase),
            )
        );
        const wrapper = mount(<Router><Navbar store={store} /></Router>)
        const component = wrapper.find(Avatar)
        return expect(component.length).toBe(1)
    })
    it('should render one CustomButton component when user.userProfile', () => {
        const initialState = {
            auth: {
                userProfile: { color: "blue", email: "testEmail" },

            },
            message: { text: "testMessage", severity: "success" }
        }
        const auth = (state = initialState, action) => {
            return state
        }
        const store = createStore(
            auth,
            composeEnhancers(
                applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
                reduxFirestore(firebase),
            )
        );
        const wrapper = mount(<Router><Navbar store={store} /></Router>)
        const component = wrapper.find(CustomButton)
        return expect(component.length).toBe(1)
    })
    it('should render one MUI AccountCircleOutlinedIcon component', () => {
        findByDataTest('accountCircleOutlinedIcon', 1)
    })
    it('should render one Message component when text', () => {
        const initialState = {
            auth: {
                userProfile: { color: "blue", email: "testEmail" },

            },
            message: { text: "testMessage", severity: "success" }
        }
        const auth = (state = initialState, action) => {
            return state
        }
        const store = createStore(
            auth,
            composeEnhancers(
                applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
                reduxFirestore(firebase),
            )
        );
        const wrapper = mount(<Router><Navbar store={store} /></Router>)
        const component = wrapper.find(Message)
        return expect(component.length).toBe(1)
    })
})