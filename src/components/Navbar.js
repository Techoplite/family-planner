import React from 'react'
import { AppBar, Toolbar, Grid, Typography, makeStyles } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CustomButton from './inputs/CustomButton'

const useStyles = makeStyles(theme => (
    {
        circleButton: {
            borderRadius: theme.spacing(10),
            minWidth: 0,
            padding: "6px 14px",
            backgroundColor: "coral", //temporary
            fontSize: "1rem",
            boxShadow: "none"
        }
    }
))

const Navbar = (props) => {



    const classes = useStyles()




    return (
        <AppBar>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={2} />
                    <Grid item xs>
                        <Typography variant="h4">iFam</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {props.auth ?
                            <CustomButton
                                variant="contained"
                                color="primary"
                                className={classes.circleButton}
                                onClick={props.handleOnClick}>
                                {props.auth.charAt(0)}
                            </CustomButton>
                            : <AccountCircleOutlinedIcon fontSize="large" />}

                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;