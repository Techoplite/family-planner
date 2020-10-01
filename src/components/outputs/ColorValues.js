const getColorValue = (colorName) => {
    switch (colorName) {
        case 'red':
            return "#d22d2d"
        case 'blue':
            return "#2979ff"
        case 'green':
            return "#00e676"
        case 'yellow':
            return "#ffeb3b"
        case 'orange':
            return "#ff9100"
        case 'pink':
            return "#ff337a"
        case 'purple':
            return "#ff337a"
        case 'teal':
            return "#009688"
        case 'grey':
            return "#7893a1"
        default: return ''
    }
}

export default getColorValue;
