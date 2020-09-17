import React from 'react'
import { AppBar, Toolbar, Grid, Typography, makeStyles } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CustomButton from './inputs/CustomButton'
import Message from './outputs/Message';


const useStyles = makeStyles(theme => (
    {
        circleButton: {
            borderRadius: theme.spacing(10),
            minWidth: 0,
            padding: "6px 14px",
            backgroundColor: "coral", //temporary
            fontSize: "1rem",
            boxShadow: "none"
        },
        message: {
            borderRadius: "0"
        }
    }
))

const Navbar = (props) => {

    const classes = useStyles()

    const { message, severity } = props

    return (
        <AppBar>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={2} />
                    <Grid item xs>
                        <Typography variant="h4">iFam</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {props.auth.email ?
                            <CustomButton
                                variant="contained"
                                color="primary"
                                className={classes.circleButton}
                                onClick={props.handleOnClick}>
                                {props.auth.email.charAt(0)}
                            </CustomButton>
                            : <AccountCircleOutlinedIcon fontSize="large" />}

                    </Grid>
                </Grid>
            </Toolbar>
            {message && <Message message={message} severity={severity}/>}
        </AppBar>
    );
}

export default Navbar;