import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect, Switch, BrowserRouter as Route } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";
import CustomButton from '../inputs/CustomButton';
import { updateShoppingList } from './../../store/actions/shoppingList'
import AddShoppingItemForm from './AddShoppingItemForm'
import { clearRedirectPath } from "../../store/actions/auth";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';



const ShoppingItems = (props) => {

    // Redux
    const { auth } = props;

    // React
    const initialState = { shoppingItems: [], itemsToDelete: [] }
    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        e.target.checked === true ?
            setState({
                ...state,
                itemsToDelete: [...state.itemsToDelete, e.target.id]
            })
            :
            setState({
                ...state,
                itemsToDelete: state.itemsToDelete.filter(item => (item
                    !== e.target.id))
            })
    }

    const handleClick = () => {
        const shoppingItems = state.shoppingItems.filter(shoppingItem => !state.itemsToDelete.includes(shoppingItem.itemName))
        console.log('shoppingItems', shoppingItems)
        props.updateShoppingList(shoppingItems, auth.family.password)

    }

    useEffect(() => {
        state && auth.family &&
            setState((prevState) => ({
                ...prevState,
                shoppingItems: auth.family.shoppingItems,
            }));
        props.clearRedirectPath()
    }, [auth.family && auth.family, clearRedirectPath]);

    // Material UI
    const useStyles = makeStyles((theme) => ({
        icon: {
            backgroundColor: "lightgrey",
            padding: "10px",
            borderRadius: "50px",
            border: "2px solid #3F51B5",
            marginBottom: theme.spacing(1)
        },
        paper: {
            backgroundColor: '#edd45d',
            display: 'flex',
            alignItems: 'baseline',
            flexDirection: 'column',
            width: "80%",
            marginLeft: "10%",
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),

        },
        typography: {
            marginBottom: theme.spacing(4),
        },
        formControlLabel: {
            marginLeft: theme.spacing(1),
        },
        addIcon: {
            position: "fixed",
            bottom: "35px",
            right: "37px",
            zIndex: 2
        },
        whiteBackground: {
            background: "white",
            width: "2rem",
            height: "2rem"
        },
        addCircleIcon: {
            fontSize: "4.5rem",
            position: "fixed",
            bottom: "1rem",
            right: "1rem"
        },
        customButton: {
            width: "80%",
            marginTop: theme.spacing(4),
        },
        add: {
            color: "#00ca00",
            marginLeft: "19px",
            marginTop: "10px",
            border: "2px solid #00ca00",
            borderRadius: "50%",
            fontSize: "17px"
        }
    }));

    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>{auth.redirectPath === '/shopping-list/add-shopping-item' ?
            <Switch>
                <Redirect exact from="/shopping-list/shopping-list-items" to="/shopping-list/add-shopping-item" />

                <Route exact path="/shopping-list/add-shopping-item" component={AddShoppingItemForm} />
            </Switch>
            :
            <>
                {state.shoppingItems &&
                    <>
                        <ShoppingCartIcon className={classes.icon} />
                        <Typography variant="h5" className={classes.typography} >Shopping List</Typography>
                        <Paper elevation={3} className={classes.paper}>
                            {state.shoppingItems && state.shoppingItems.map(item =>
                                < FormControlLabel
                                    style={{
                                        textDecoration: state.itemsToDelete.includes(item.itemName) && 'line-through',
                                        color: state.itemsToDelete.includes(item.itemName) && "#f50057"
                                    }}
                                    key={item.itemName}
                                    className={classes.formControlLabel}
                                    control={
                                        < Checkbox
                                            id={item.itemName}
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleOutlineIcon />}
                                            name={item.itemName}
                                            onChange={handleChange}
                                        />}
                                    label={
                                        `${item.itemName} 
                            ${item.shop !== false ? `[${item.shop}]` : ""} 
                            ${item.quantity !== "" ? `x${item.quantity}` : ""}`
                                    }
                                />
                            )}
                            <Link to="/shopping-list/add-shopping-item"><AddIcon className={classes.add} /></Link>
                        </Paper>
                        {state.itemsToDelete.length > 0 &&
                            <CustomButton
                                className={classes.customButton}
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                onClick={handleClick}
                            >
                                UPDATE LIST
                </CustomButton>}
                        {!matches && <Link to="/shopping-list/add-shopping-item">
                            <div className={classes.addIcon}>
                                <div className={classes.whiteBackground}></div>
                                <AddCircleIcon className={classes.addCircleIcon} color="secondary" />
                            </div>
                        </Link>}
                    </>
                }
            </>
        }
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToprops = (dispatch) => {
    return {
        updateShoppingList: (shoppingItems, familyPassword) => dispatch(updateShoppingList(shoppingItems, familyPassword)),
        clearRedirectPath: () => dispatch(clearRedirectPath())


    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToprops)(ShoppingItems));