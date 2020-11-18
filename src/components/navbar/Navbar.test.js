import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './Navbar'
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import root from './../../store/reducers/root'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'
import firebase from './../../config/firebase'

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
    // it('should render one MUI Zoom component when state.color !== null', () => {
    //     findByDataTest('zoom', 1)
    // })
    // it('should render one MUI Avatar component when user.userProfile', () => {
    //     findByDataTest('avatar', 1)
    // })
    // it('should render one CustomButton component when user.userProfile', () => {
    //     findByDataTest('customButton', 1)
    // })
    it('should render one MUI AccountCircleOutlinedIcon component', () => {
        findByDataTest('accountCircleOutlinedIcon', 1)
    })
    // it('should render one Message component when text', () => {
    //     findByDataTest('message', 1)
    // })
})