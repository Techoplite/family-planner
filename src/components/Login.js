import React from 'react'
import { useForm, Form } from './hooks/useForm'
import CustomButton from './inputs/CustomButton'
import CustomTextField from './inputs/CustomTextField'
import { login } from '../store/actions/auth'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import VpnKeyIcon from '@material-ui/icons/VpnKey';



const Login = (props) => {

    const initialState = {
        email: "",
        password: ""
    }


    const { state, handleOnChange, errors, setErrors } = useForm(initialState)
    const { setMessage, setSeverity } = props

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setSeverity("success")
            setMessage("Login successful.")
            props.login(state)
        }


    }

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

    const validate = () => {
        let errors = {}
        errors.email = (state.email ? "" : "The email is required.") ||
            (errors.email = (/^$|.+@.+..+/).test(state.email) ? "" : "Email is not valid.")
        errors.password = (state.password ? "" : "The password is required.") ||
            ((state.password.length >= 8 && /[a-z]/i.test(state.password) && /[0-9]/i.test(state.password)
                ? "" : "The password must contain at list 8 alphanumerical values."))

        setErrors({
            ...errors
        })
        return Object.values(errors).every(value => value === "")
    }


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
                    error={errors.email}
                />
                <CustomTextField
                    label="Password"
                    name="password"
                    required
                    value={state.password}
                    onChange={handleOnChange}
                    error={errors.password}
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