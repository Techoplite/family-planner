import React, { useEffect } from 'react'
import { AppBar, Toolbar, Grid, Typography, makeStyles } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CustomButton from './inputs/CustomButton'
import Message from './outputs/Message';
import { connect } from 'react-redux'
import { clearMessage } from './../store/actions/message'
import getColorValue from './outputs/ColorValues';

const Navbar = (props) => {

    // Redux
    const { text, severity } = props.message
    const { auth, clearMessage, user } = props

    // React
    useEffect(() => {
        text !== null && window.setTimeout(() => {
            clearMessage();
        }, 5000);
    }, [text, clearMessage])

    // Material UI
    const useStyles = makeStyles(theme => (
        {
            circleButton: {
                borderRadius: theme.spacing(10),
                minWidth: 0,
                padding: " 8px 10px",
                backgroundColor: getColorValue(user.color),
                fontSize: "1.5rem",
                boxShadow: "none",
                lineHeight: "1rem",
                letterSpacing: 0
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
                        {auth && user.color ?
                            <CustomButton
                                variant="contained"
                                color="primary"
                                className={classes.circleButton}
                                onClick={props.handleOnClick}
                                list={props.list}
                            >
                                {auth.email.charAt(0)}
                            </CustomButton>
                            : <AccountCircleOutlinedIcon
                                fontSize="large"
                                onClick={props.handleOnClick}
                                list={props.list}

                            />}

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
        auth: state.firebase.auth,
        user: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearMessage: () => dispatch(clearMessage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);