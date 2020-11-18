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


describe('<Navbar />', () => {

    it('should render a single Material UI AppBar component', () => {
        const wrapper = shallow(<Navbar store={store} />).dive()
        const appBarMUIComponent = wrapper.dive().dive().find(`[data-test='appBar']`)
        expect(appBarMUIComponent.length).toBe(1)
    })
})