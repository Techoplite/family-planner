import React from 'react'
import { AppBar, Toolbar, Grid, Typography, makeStyles } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CustomButton from './inputs/CustomButton'
import Message from './outputs/Message';
import { connect } from 'react-redux'




const Navbar = (props) => {

    // Redux
    const { text, severity } = props.message
    const { auth } = props

    // Material UI
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
                        {auth.isEmpty === false ?
                            <CustomButton
                                variant="contained"
                                color="primary"
                                className={classes.circleButton}
                                onClick={props.handleOnClick}>
                                {auth.email.charAt(0)}
                            </CustomButton>
                            : <AccountCircleOutlinedIcon fontSize="large" />}

                    </Grid>
                </Grid>
            </Toolbar>
            {text && <Message message={text} severity={severity} />}
        </AppBar>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        message: state.message,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);