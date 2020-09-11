import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

export function useForm(initialState) {

    const [values, setValues] = useState(initialState)

    const handleOnChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        {
            values,
            setValues,
            handleOnChange
        }
    );
}

export function Form(props) {

    return (
        <form>
            <Typography variant="h5">
                {props.title}
            </Typography>
            {props.children}
        </form>
    )
}
