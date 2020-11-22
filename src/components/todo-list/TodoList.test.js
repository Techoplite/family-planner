import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoList from './TodoList'
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




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    auth: {
        family: {
            password: "test",
            todoItems: [
                { id: "testId1", text: "testText1" },
                { id: "testId2", text: "testText2" },
            ]
        },
    },
    isAddingItem: true,
    itemsToDelete: [{ id: "testId2", text: "testText2" }]
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

configure({ adapter: new Adapter() })

const findByDataTest = (dataTestId, numberOfExpectedComponents) => {
    const wrapper = shallow(<TodoList store={store} />)
    const component = wrapper.dive().dive().find(`[data-test='${dataTestId}']`)
    return expect(component.length).toBe(numberOfExpectedComponents)
}

const findByComponentName = (componentName, numberOfExpectedComponents) => {
    const mount = createMount()
    const wrapper = mount(<TodoList store={store} />)
    const component = wrapper.find(componentName)
    return expect(component.length).toBe(numberOfExpectedComponents)
}

describe('<TodoList />', () => {
    it('should render a single MUI FormatListBulletedIcon component', () => {
        findByDataTest('formatListBulletedIcon', 1)
    })
    it('should render a single MUI Typography component', () => {
        findByDataTest('typography', 1)
    })
    it('should render a single MUI Paper component', () => {
        findByDataTest('paper', 1)
    })
    it('should render two MUI FormControlLabel components', () => {
        findByComponentName(FormControlLabel, 2)
    })
    it('should render two MUI Checkbox components', () => {
        findByComponentName(Checkbox, 2)
    })
    it('should render two MUI RadioButtonUncheckedIcon components', () => {
        findByComponentName(RadioButtonUncheckedIcon, 2)
    })
    // it('should render two MUI CheckCircleOutlineIcon components', () => {
    //     const mount = createMount()
    //     const wrapper = mount(<TodoList store={store} />)
    //     const component = wrapper.find(CheckCircleOutlineIcon)
    //     return expect(component.length).toBe(2)
    // })
    it('should render a single MUI Grow component', () => {
        findByDataTest('grow', 1)
    })
    it('should render a single MUI TextField component', () => {
        findByDataTest('textField', 1)
    })
    it('should render a single MUI AddCircleIcon component', () => {
        findByComponentName(AddCircleIcon, 1)
    })
    it('should render a single MUI CustomButton component when AddCircleIcon is clicked', () => {
        const mount = createMount()
        const wrapper = mount(<TodoList store={store} />)
        const addButton = wrapper.find(AddCircleIcon)
        addButton.simulate("click")
        const component = wrapper.find(CustomButton)
        return expect(component.length).toBe(1)
    })

})
