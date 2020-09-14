import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

export function useForm(initialState) {

    const [state, setState] = useState(initialState)

    const handleOnChange = e => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
        console.log('state', state)
    }

    return (
        {
            state,
            setState,
            handleOnChange
        }
    );
}

export function Form(props) {

    const { children, ...other } = props

    return (
        <form autoComplete="off" {...other}>
            <Typography variant="h5">
                {props.title}
            </Typography>
            {props.children}
        </form>
    )
}
