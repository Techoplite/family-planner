import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CustomButton from './CustomButton'
import React from 'react'


configure({ adapter: new Adapter() })

describe('<CustomButton />', () => {

    it('should render a single Material UI Button component', () => {
        const wrapper = shallow(<CustomButton message="testMessage" severity="info" />)
        const buttonMUIComponent = wrapper.find(`[data-test='button']`)
        expect(buttonMUIComponent.length).toBe(1)
    })
})