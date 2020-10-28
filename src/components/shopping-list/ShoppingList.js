import React from 'react';
import { withRouter } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const ShoppingList = () => {

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
            height: '300px',
            width: '100%',
            display: 'flex'
        },
        typography: {
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(4)
        },
    }));
    const classes = useStyles();

    return (
        <>
            <ShoppingCartIcon className={classes.icon} />
            <Typography variant="h5" className={classes.typography} >Shopping List</Typography>
            <Paper elevation={3} className={classes.paper}>
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                    label="Custom icon"
                />
            </Paper>

        </>
    );
}

export default withRouter(ShoppingList);