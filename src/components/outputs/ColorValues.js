const getColorValue = (colorName) => {
    switch (colorName) {
        case 'red':
            return "#ff1744"
        case 'blue':
            return "#2979ff"
        case 'green':
            return "#00e676"
        case 'yellow':
            return "#ffeb3b"
        case 'orange':
            return "#ff9100"
        case 'pink':
            return "#f50057"
        case 'purple':
            return "#673ab7"
        case 'teal':
            return "#009688"
        case 'grey':
            return "#607d8b"
        default: return ''
    }
}

export default getColorValue;
