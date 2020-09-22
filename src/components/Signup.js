import React from 'react'
import { useForm, Form } from './hooks/useForm'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { FormControl, makeStyles, Typography, FormHelperText } from '@material-ui/core'
import CustomButton from './inputs/CustomButton';
import CustomTextField from './inputs/CustomTextField';
import { setMessage } from '../store/actions/message'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { signup } from '../store/actions/auth'
import getColorValue from './outputs/ColorValues';

const Signup = (props) => {

    // React
    const initialState = {
        name: "",
        email: "",
        password: "",
        color: "",
        errors: {
            name: "",
            email: "",
            password: "",
            color: ""
        },
        availableColors: [
            {
                name: "red",
                value: getColorValue("red")
            },
            {
                name: "blue",
                value: getColorValue("blue")
            },
            {
                name: "green",
                value: getColorValue("green")
            },
            {
                name: "yellow",
                value: getColorValue("yellow")
            },
            {
                name: "orange",
                value: getColorValue("orange")
            },
            {
                name: "pink",
                value: getColorValue("pink")
            },
            {
                name: "purple",
                value: getColorValue("repurpled")
            },
            {
                name: "teal",
                value: getColorValue("teal")
            },
            {
                name: "grey",
                value: getColorValue("grey")
            },
        ]
    }

    const { state, handleOnChange, setState } = useForm(initialState)

    const validate = () => {
        let errors = {}
        errors.name = (state.name ? "" : "Name is required.") ||
            (/^[A-Za-z]+$/i.test(state.name) ? "" : "Name is not valid.")
        errors.email = (state.email ? "" : "Email is required.") ||
            (errors.email = (/^$|.+@.+..+/).test(state.email) ? "" : "Email is not valid.")
        errors.password = (state.password ? "" : "Password is required.") ||
            ((state.password.length >= 8 &&
                /[a-z]/i.test(state.password) &&
                /[0-9]/i.test(state.password)
                ? "" : "Password must contain at list 8 alphanumerical values."))
        errors.color = (state.color ? "" : "Color is required.")
        setState({
            ...state,
            errors
        })
        return Object.values(errors).every(value => value === "")
    }

    const handleOnClick = (e) => {
        e.preventDefault()
        setState({
            ...state,
            color: e.target.id
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        state.name.charAt(0).toUpperCase()
        if (validate()) {
            const credentials = ({ email: state.email, password: state.password })
            props.signup(credentials, state.name, state.color)
        }

    }

    // Material UI
    const cirlceSize = 70
    const marginX = 7
    const marginY = 10

    const useStyles = makeStyles(theme => (
        {
            message: {
                marginTop: theme.spacing(3)
            },
            icon: {
                backgroundColor: "lightgrey",
                padding: "10px",
                borderRadius: "50px",
                border: "2px solid #3F51B5",
                marginBottom: theme.spacing(1)
            },
            formControl: {
                minWidth: 120,
                marginTop: theme.spacing(3)

            },
            colorPicker: {
                marginTop: theme.spacing(1),
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
            },
            colorCircle: {
                height: cirlceSize,
                width: cirlceSize,
                borderRadius: 70,
                marginTop: marginY,
                marginBottom: marginY,
                marginLeft: marginX,
                marginRight: marginX,
                border: "2px solid #3F51B5",
                "&:hover": {
                    border: "4px solid #3F51B5",
                    marginTop: marginY - 2,
                    marginBottom: marginY - 2,
                    marginLeft: marginX - 2,
                    marginRight: marginX - 2,

                }
            },
            formHelperText: {
                color: "red"
            }
        }
    ))

    const classes = useStyles()
    return (
        <>
            <AccountCircleIcon className={classes.icon} />
            <Form title="Sign up"
                onSubmit={handleOnSubmit} >
                {props.authError &&
                    <Alert className={classes.message}
                        variant="outlined"
                        severity="error">{props.authError}
                    </Alert>}
                <CustomTextField
                    label="Name"
                    name="name"
                    required
                    autoFocus
                    value={state.name}
                    onChange={handleOnChange}
                    error={state.errors.name}
                />
                <CustomTextField
                    label="Email"
                    name="email"
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
                <FormControl
                    fullWidth variant="outlined"
                    className={classes.formControl}
                >
                    <Typography variant="h6" align="left">Pick a color *</Typography>
                    {state.errors.color && <FormHelperText
                        className={classes.formHelperText}
                        align="left">
                        {state.errors.color}
                    </FormHelperText>}
                    <Typography variant="body2" align="left">This is to give you a parsonalised user experience.</Typography>
                    <div className={classes.colorPicker}>
                        {state.availableColors.map(color => {
                            return (
                                <div
                                    className={classes.colorCircle}
                                    id={color.name}
                                    key={color.name}
                                    style={{
                                        backgroundColor: `${color.value}`
                                    }}
                                    onClick={handleOnClick}
                                />
                            )
                        })}
                    </div>
                </FormControl>
                <CustomButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    SIGN UP
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
        signup: (credentials, name, color) => dispatch(signup(credentials, name, color)),
        setMessage: (text, severity) => dispatch(setMessage(text, severity))
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(Signup);