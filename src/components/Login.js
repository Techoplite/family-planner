import React from 'react'
import { useForm, Form } from './hooks/useForm'
import CustomTextField from './inputs/CustomTextField'



const Login = () => {

    const initialState = {
        email: "",
        password: ""
    }


    const { values, setValues, handleOnChange } = useForm(initialState)

    return (
        <Form title="Log in">
            <CustomTextField
                label="Email"
                name="email"
                autoFocus={true}
                required="true"
                value={values.email}
                onChange={handleOnChange}
            />
            <CustomTextField
                label="Password"
                name="password"
                autoFocus={false}
                required="true"
                value={values.email}
                onChange={handleOnChange}
            />
        </Form>
    );
}

export default Login;