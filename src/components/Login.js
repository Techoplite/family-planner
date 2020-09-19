import React from 'react'
import { useForm, Form } from './hooks/useForm'
import CustomButton from './inputs/CustomButton'
import CustomTextField from './inputs/CustomTextField'
import { login } from '../store/actions/auth'
import { setMessage } from '../store/actions/message'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {withRouter} from 'react-router-dom'



const Login = (props) => {
    // Redux

    // React
    const initialState = {
        email: "",
        password: "",
        errors: {
            email: "",
            password: ""
        }
    }

    const { state, handleOnChange, setState } = useForm(initialState)

    const handleOnSubmit = async(e) => {
        e.preventDefault()
        if (validate()) {
            props.login(state)
        }

    }

    const validate = () => {
        let errors = {}
        errors.email = (state.email ? "" : "Email is required.") ||
            (errors.email = (/^$|.+@.+..+/).test(state.email) ? "" : "Email is not valid.")
        errors.password = (state.password ? "" : "Password is required.") ||
            ((state.password.length >= 8 && /[a-z]/i.test(state.password) && /[0-9]/i.test(state.password)
                ? "" : "Password must contain at list 8 alphanumerical values."))
        setState({
            ...state,
            errors
        })
        return Object.values(errors).every(value => value === "")
    }

    // Material UI
    const useStyles = makeStyles(theme => (
        {
            message: {
                marginTop: theme.spacing(3)
            },
            icon: {
                backgroundColor: "lightgrey",
                padding: "10px",
                borderRadius: "50px",
                border: "1px solid grey",
                marginBottom: theme.spacing(1)

            }
        }
    ))

    const classes = useStyles()

    return (
        <>
            <VpnKeyIcon className={classes.icon} />
            <Form title="Log in" onSubmit={handleOnSubmit} >
                {props.authError && <Alert className={classes.message} variant="outlined" severity="error">{props.authError}</Alert>}
                <CustomTextField
                    label="Email"
                    name="email"
                    autoFocus
                    required
                    value={state.email}
                    onChange={handleOnChange}
                    error={state.errors.email}
                />
                <CustomTextField
                    label="Password"
                    name="password"
                    required
                    value={state.password}
                    onChange={handleOnChange}
                    error={state.errors.password}
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
        </>
    );
}

// Redux
const mapStateToprops = state => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: credentials => dispatch(login(credentials)),
        setMessage: (text, severity) => dispatch(setMessage(text, severity))
    }
}

export default withRouter(connect(mapStateToprops, mapDispatchToProps)(Login));