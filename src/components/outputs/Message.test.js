import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Message from './Message'
import React from 'react'


configure({ adapter: new Adapter() })

describe('<Message />', () => {
    it('should render the message passed in props', () => {
        const wrapper = shallow(<Message message="testMessage" severity="success" />)
        expect(wrapper.text()).toBe("testMessage")
    })
    it('should render a single Material UI Alert component', () => {
        const wrapper = shallow(<Message message="testMessage" severity="success" />)
        const alertMUIComponent = wrapper.find(`[data-test='alert']`)
        expect(alertMUIComponent.length).toBe(1)
    })
})