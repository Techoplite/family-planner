import getColorValue from './ColorValues'

describe('getColorValue', () => {
    it('should return #f44336', () => {
        const colorName = 'red'
        const colorValue = '#f44336'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return #2196f3', () => {
        const colorName = 'blue'
        const colorValue = '#2196f3'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return #618833', () => {
        const colorName = 'green'
        const colorValue = '#618833'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return #ffc107', () => {
        const colorName = 'yellow'
        const colorValue = '#ffc107'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return #ff9100', () => {
        const colorName = 'orange'
        const colorValue = '#ff9100'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return #ff337a', () => {
        const colorName = 'pink'
        const colorValue = '#ff337a'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return #af52bf', () => {
        const colorName = 'purple'
        const colorValue = '#af52bf'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return #009688', () => {
        const colorName = 'teal'
        const colorValue = '#009688'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return #7893a1', () => {
        const colorName = 'grey'
        const colorValue = '#7893a1'
        expect(getColorValue(colorName)).toEqual(colorValue)
    })
    it('should return an empty string', () => {
        expect(getColorValue()).toEqual("")
    })
})