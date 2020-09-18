export const setMessage = (text, severity) => {
    return (
        {
            type: 'SET_MESSAGE',
            payload: {
                text,
                severity
            }
        }
    )
}

export const clearMessage = () => {
    return (
        {
            type: 'CLEAR_MESSAGE',
            payload: {
                text: null,
                severity: null
            }
        }
    )
}

