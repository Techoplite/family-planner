import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CustomTextField from './CustomTextField/'
import React from 'react'


configure({ adapter: new Adapter() })

describe('<CustomTextField />', () => {

    it('should render a single Material UI Button component', () => {
        const wrapper = shallow(<CustomTextField />)
        const alertMUIComponent = wrapper.find(`[data-test='text-field']`)
        expect(alertMUIComponent.length).toBe(1)
    })
})