const getColorValue = (colorName) => {
    switch (colorName) {
        case 'red':
            return "#f44336"
        case 'blue':
            return "#2196f3"
        case 'green':
            return "#618833"
        case 'yellow':
            return "#ffc107"
        case 'orange':
            return "#ff9100"
        case 'pink':
            return "#ff337a"
        case 'purple':
            return "#af52bf"
        case 'teal':
            return "#009688"
        case 'grey':
            return "#7893a1"
        default: return ''
    }
}

export default getColorValue;
