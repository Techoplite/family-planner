import React from 'react'
import { useForm, Form } from './hooks/useForm'
import CustomTextField from './inputs/CustomTextField'



const Login = () => {

    const initialState = {
        email: "",
        password: ""
    }


    const { values, handleOnChange } = useForm(initialState)

    return (
        <Form title="Log in">
            <CustomTextField
                label="Email"
                name="email"
                autoFocus
                required
                value={values.email}
                onChange={handleOnChange}
            />
            <CustomTextField
                label="Password"
                name="password"
                required
                value={values.password}
                onChange={handleOnChange}
            />
        </Form>
    );
}

export default Login;