import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';



const ShoppingList = () => {

    // React
    const initialState = {
        shoppingItems: [
            { text: 'Bleach', shop: 'Tesco', quantity: 3 },
            { text: 'Butter', shop: '', quantity: 0 },
            { text: 'Toilet Paper', shop: 'Aldi', quantity: 1 },
            { text: 'Cheese', shop: 'Asda', quantity: 0 },
            { text: 'Salad', shop: '', quantity: 0 },
        ],
    }
    const [state, setState] = useState(initialState)

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.checked
        });
    }

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
            flexDirection: 'column'
        },
        typography: {
            marginBottom: theme.spacing(4),
        },
        formControlLabel: {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1),
        }
    }));
    const classes = useStyles();

    return (
        <>
            <ShoppingCartIcon className={classes.icon} />
            <Typography variant="h5" className={classes.typography} >Shopping List</Typography>
            <Paper elevation={3} className={classes.paper}>
                {state.shoppingItems.map(item =>
                    < FormControlLabel
                        style={{
                            textDecoration: state[item.text] === true && 'line-through',
                            color: state[item.text] === true && "#f50057"
                        }}
                        key={item.text}
                        className={classes.formControlLabel}
                        control={
                            < Checkbox
                                id={item.text}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleOutlineIcon />}
                                name={item.text}
                                onChange={handleChange}
                            />}
                        label={
                            `${item.text} ${item.shop && `[${item.shop}]`} 
                            ${item.quantity !== 0 && `x${item.quantity}`}`}
                    />
                )}
            </Paper>

        </>
    );
}

export default withRouter(ShoppingList);