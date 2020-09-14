import React from 'react'
import { useForm, Form } from './hooks/useForm'
import CustomButton from './inputs/CustomButton'
import CustomTextField from './inputs/CustomTextField'
import login from '../store/actions/auth'
import { connect } from 'react-redux'



const Login = (props) => {

    const initialState = {
        email: "",
        password: ""
    }


    const { state, handleOnChange } = useForm(initialState)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.login(state)
    }

    return (
        <Form title="Log in" onSubmit={handleOnSubmit}>
            <CustomTextField
                label="Email"
                name="email"
                autoFocus
                required
                value={state.email}
                onChange={handleOnChange}
            />
            <CustomTextField
                label="Password"
                name="password"
                required
                value={state.password}
                onChange={handleOnChange}
            />
            <CustomButton
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
            >
                LOG IN
            </CustomButton>
        </Form>
    );
}

const mapStateToprops = state => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: credentials => dispatch(login(credentials))
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(Login);