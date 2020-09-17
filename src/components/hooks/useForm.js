import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

export function useForm(initialState) {

    const [state, setState] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleOnChange = e => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }

    return (
        {
            state,
            setState,
            handleOnChange,
            errors,
            setErrors
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
