import React from 'react'
import { useForm, Form } from '../hooks/useForm'
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import CustomTextField from '../inputs/CustomTextField';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles, TextField, Typography } from '@material-ui/core'
import CustomButton from '../inputs/CustomButton';


const AddShoppingItemForm = (props) => {
    // React 
    const initialState = {
        redirect: false,
        itemName: "",
        shop: "",
        quantity: "",
        errors: {
            title: "",
            date: "",
            location: ""
        }
    }

    const { state, handleOnChange, setState } = useForm(initialState)

    const validate = () => {
        let errors = {}
        errors.itemName = (state.itemName ? "" : "Title is required.")
        errors.quantity = ((/^[1-9]\d*$/i.test(state.quantity) || state.quantity === "") ? "" : "Quantity must be a positive integer numbe.")
        const itemName = state.itemName !== "" && state.itemName[0].toUpperCase() + state.itemName.substring(1)
        const shop = state.shop !== "" && state.shop[0].toUpperCase() + state.shop.substring(1)
        const convertedState = {
            itemName,
            shop,
            quantity: state.quantity
        }
        console.log('convertedState', convertedState)
        setState({
            ...state,
            errors,
        })
        return Object.values(errors).every(value => value === "")
    }

    const handleOnSubmit = async e => {
        e.preventDefault()
        if (validate()) {
            console.log("form is VALID");
            // props.addEvent(convertedState, family.password, user)
            // redirect()
        } else {
            console.log("form is invalid");
        }
        // return () => {
        //     setState({
        //         ...state,
        //         redirect: false
        //     })
        // }
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
                border: "2px solid #3F51B5",
                marginBottom: theme.spacing(1)

            },
            typography: {
                marginBottom: theme.spacing(1),
                marginTop: theme.spacing(4)
            },
            customTextField: {
                marginTop: theme.spacing(0),
                "& .MuiIconButton-root": {
                    padding: 0
                }
            },
            dateTimeWrapper: {
                display: "flex",
                justifyContent: "space-evenly"
            },
            radioGroup: {
                display: "flex",
                justifyContent: "left",
            },
            picker: {
                display: "flex",
                flexDirection: "column",
            }
        }
    ))

    const classes = useStyles()

    return (
        <>
            {state.redirect && <Redirect to="/calendar/events" />}
            <AddShoppingCartIcon className={classes.icon} />
            <Form
                title="Add item to list"
                onSubmit={handleOnSubmit}
            >
                {/* Title */}
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left"
                >
                    Enter an Item Name*
                    </Typography>
                <CustomTextField
                    autoFocus
                    required
                    className={classes.customTextField}
                    label="item Name"
                    onChange={handleOnChange}
                    value={state.itemName}
                    name="itemName"
                    helperText={state.errors.itemName}
                    error={state.errors.itemName ? true : false}

                />

                {/* Shop */}
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter a Shop Name
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    onChange={handleOnChange}
                    label="Shop"
                    value={state.shop}
                    name="shop"
                    helperText={state.errors.shop}
                    error={state.errors.shop ? true : false}
                />

                {/* Quantity */}
                <Typography
                    variant="subtitle1"
                    className={classes.typography}
                    align="left">
                    Enter a Quantity
                    </Typography>
                <CustomTextField
                    className={classes.customTextField}
                    onChange={handleOnChange}
                    label="Quantity"
                    value={state.quantity}
                    name="quantity"
                    helperText={state.errors.quantity}
                    error={state.quantity.shop ? true : false}
                />

                <CustomButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                >
                    ADD SHOPPIING ITEM
                </CustomButton>
            </Form>
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        family: state.auth.family,
        user: state.auth.userProfile.email
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         setMessage: (text, severity) => dispatch(setMessage(text, severity)),
//         addEvent: (state, family, user) => dispatch(addEvent(state, family, user)),
//     }
// }

export default withRouter(connect(mapStateToProps)(AddShoppingItemForm));