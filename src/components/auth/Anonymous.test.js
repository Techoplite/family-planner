import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Anonymous from './Anonymous'
import React from 'react'

configure({ adapter: new Adapter() })

const findByDataTestId = (dataTestId, numberOfComponentsExpected) => {
    const wrapper = shallow(<Anonymous />)
    const component = wrapper.find(`[data-testid='${dataTestId}']`)
    expect(component.length).toBe(numberOfComponentsExpected)
}

describe('<Anonymous />', () => {
    it('should render a single "jumbotron" HTML div element', () => {
        findByDataTestId('jumbotron', 1)
    })
    it('should render three "typography-h4" MUI components', () => {
        findByDataTestId('typography-h4', 3)
    })
    it('should render a single AuthenticatedIphone HTML img element', () => {
        findByDataTestId('authenticatedIphone', 1)
    })
    it('should render a single "auth" HTML div element', () => {
        findByDataTestId('auth', 1)
    })
    it('should render a single "buttonsGroup" HTML div element', () => {
        findByDataTestId('buttonsGroup', 1)
    })
    it('should render two React-Router-Dom Link components', () => {
        findByDataTestId('link', 2)
    })
    it('should render two MUI Button components', () => {
        findByDataTestId('button-contained', 2)
    })
    it('should render a single "buttonsGroup" HTML div element', () => {
        findByDataTestId('appDescription', 1)
    })
    it('should render a single "typography-h6" MUI components', () => {
        findByDataTestId('typography-h6', 1)
    })
    it('should render a single "ul" HTML div element', () => {
        findByDataTestId('ul', 1)
    })
    it('should render two "li" HTML div element', () => {
        findByDataTestId('li', 2)
    })
    it('should render two "typography-body1" MUI components', () => {
        findByDataTestId('typography-body1', 2)
    })
    it('should render two "typography-body2" MUI components', () => {
        findByDataTestId('typography-body2', 1)
    })
    it('should render a single "happyFamily" HTML img element', () => {
        findByDataTestId('happyFamily', 1)
    })
    it('should render a single "footer" HTML div element', () => {
        findByDataTestId('footer', 1)
    })
})