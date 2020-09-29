import React, { useEffect } from 'react'
import { useForm, Form } from './hooks/useForm'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { FormControl, makeStyles, Typography, FormHelperText } from '@material-ui/core'
import CustomButton from './inputs/CustomButton';
import CustomTextField from './inputs/CustomTextField';
import { setMessage } from '../store/actions/message'
import { connect } from 'react-redux'
import { Alert, AlertTitle } from '@material-ui/lab'
import { findFamily, signup, resetFamily, passwordAlreadyTaken, passwordNeeded } from '../store/actions/auth'
import getColorValue from './outputs/ColorValues';
import firebase from './../config/firebase'

var db = firebase.firestore();

const Signup = (props) => {

    // React
    const allColors = [
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
            value: getColorValue("purple")
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
        createFamily: false,
        surname: "",
        availableColors: allColors
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


    const handleOnSubmit = async (e, id) => {
        e.preventDefault()
        switch (id) {
            case "createFamily":
                db.collection("passwords").where("password", "==", state.password).get()
                    .then(snapshot => {
                        if (snapshot.docs.length > 0) {
                            props.passwordAlreadyTaken()
                        } else {
                            setState({
                                ...state,
                                createFamily: !state.createFamily
                            })
                        }
                    })
                return props.resetFamily()
            case "findFamily":
                return state.password !== "" ? props.findFamily(state.password) : props.passwordNeeded()
                // return props.resetFamily()

            default:
                if (validate()) {
                    const credentials = ({ email: state.email, password: state.password })

                    props.signup(credentials, state.name, state.color, state.surname)
                }
        }


    }

    const getBorder = (color) => {
        return state.color === color.name ?
            {
                backgroundColor: `${color.value}`,
                border: "4px solid #3F51B5",
                marginTop: marginY - 2,
                marginBottom: marginY - 2,
                marginLeft: marginX - 2,
                marginRight: marginX - 2,
            } :
            {
                backgroundColor: `${color.value}`

            }
    }


    useEffect(() => {
        const setAvailableColors = (family) => {
            let updatedAvailableColors = []
            family.availableColors.map(color => {
                return state.availableColors.filter(availableColor => availableColor.name === color && (updatedAvailableColors = [...updatedAvailableColors, availableColor]))
            })
            setState({
                ...state,
                availableColors: updatedAvailableColors
            })
        }
        props.availableFamily ? setAvailableColors(props.availableFamily) : setState({
            ...state,
            availableColors: allColors
        })
    }, [props.availableFamily])

    const { errors } = state

    useEffect(() => {
        errors && (
            errors.name !== "" ||
            errors.email !== "" ||
            errors.color !== "" ||
            errors.password !== "") && props.setMessage("Please check all fields", "error") && console.log("error");
    }, [errors, props])


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
                color: "red",
                marginTop: theme.spacing(0),
                marginBottom: theme.spacing(2)
            },
            typography: {
                marginBottom: theme.spacing(1),
                marginTop: theme.spacing(4)
            },
            availableFamily: {
                textAlign: "left",
                marginTop: theme.spacing(2),
            },

            customTextField: {
                marginTop: theme.spacing(0)
            }
        }
    ))

    const classes = useStyles()
    return (
        <>
            <AccountCircleIcon className={classes.icon} />
            <Form title="Sign up">
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter your first name
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    label="Name"
                    name="name"
                    required
                    autoFocus
                    value={state.name}
                    onChange={handleOnChange}
                    error={state.errors.name}
                />
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter your email
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    label="Email"
                    name="email"
                    required
                    value={state.email}
                    onChange={handleOnChange}
                    error={state.errors.email}
                />

                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter your family's password or create a new password to add your family
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    label="Password"
                    name="password"
                    required
                    value={state.password}
                    onChange={handleOnChange}
                    error={state.errors.password}
                />
                {props.authError === "Password already taken" && <FormHelperText
                    className={classes.formHelperText}
                    align="left">
                    Password already taken.
                </FormHelperText>}
                <CustomButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    onClick={(e) => handleOnSubmit(e, "findFamily")}
                    style={{ marginBottom: "0" }}>
                    Join family
            </CustomButton>
                {props.authError === "Password needed" &&

                    <Alert severity="warning" variant="outlined" className={classes.availableFamily}>
                        <AlertTitle>Error</AlertTitle>
                    You need to provide your family's password before joining it.
                    </Alert>}
                {props.availableFamily &&

                    <Alert severity="success" variant="outlined" className={classes.availableFamily}>
                        <AlertTitle>Success</AlertTitle>
                    By submitting this form you will join the <strong>{props.availableFamily.surname}</strong> family.
                    </Alert>}
                {props.authError === "No match" &&
                    <Alert severity="error" variant="outlined" className={classes.availableFamily}>
                        <AlertTitle>Error</AlertTitle>
                    There is no family associated with this password. Please enter the correct password or create a new family.
                    </Alert>}
                {props.authError === "Maximum number of memebers reached" &&
                    <Alert severity="error" variant="outlined" className={classes.availableFamily}>
                        <AlertTitle>Error</AlertTitle>
                    This family has already reached the maximum number of members available.
                    </Alert>}
                <CustomButton
                    variant="contained"
                    color="secondary"
                    fullWidth
                    type="submit"
                    onClick={(e) => handleOnSubmit(e, "createFamily")}
                    style={{ marginBottom: "0" }}>
                    Create new family
            </CustomButton>
                {state.createFamily &&
                    <CustomTextField
                        label="Surname"
                        name="surname"
                        required
                        autoFocus
                        value={state.surname}
                        onChange={handleOnChange}
                        error={state.errors.surname}
                    />}
                <FormControl
                    fullWidth variant="outlined"
                    className={classes.formControl}
                >
                    <Typography
                        variant="subtitle1"
                        className={classes.typography}
                        align="left"
                        style={{ marginBottom: "0" }}>
                        Pick a color *
                        </Typography>
                    {state.errors.color && <FormHelperText
                        className={classes.formHelperText}
                        align="left">
                        {state.errors.color}
                    </FormHelperText>}
                    <Typography variant="body2" align="left">This is to give you a personalised user experience.</Typography>
                    <div className={classes.colorPicker}>
                        {state.availableColors.map(color => {
                            return (
                                <div
                                    className={classes.colorCircle}
                                    id={color.name}
                                    key={color.name}
                                    style={getBorder(color)}

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
                    onClick={(e) => handleOnSubmit(e, "signup")} >
                    SIGN UP
            </CustomButton>
            </Form>
        </>
    );
}

// Redux
const mapStateToprops = state => {
    return {
        authError: state.auth.authError,
        availableFamily: state.auth.availableFamily
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (credentials, name, color, surname) => dispatch(signup(credentials, name, color, surname)),
        setMessage: (text, severity) => dispatch(setMessage(text, severity)),
        findFamily: (password) => dispatch(findFamily(password)),
        resetFamily: () => dispatch(resetFamily()),
        passwordAlreadyTaken: () => dispatch(passwordAlreadyTaken()),
        passwordNeeded: () => dispatch(passwordNeeded())
    }
}

export default connect(mapStateToprops, mapDispatchToProps)(Signup);