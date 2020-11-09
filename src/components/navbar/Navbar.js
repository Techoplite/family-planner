import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Grid, Typography, makeStyles } from '@material-ui/core'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CustomButton from '../inputs/CustomButton'
import Message from '../outputs/Message';
import { connect } from 'react-redux'
import { clearMessage } from '../../store/actions/message'
import getColorValue from '../outputs/ColorValues';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'
import logo from './../../Logo.svg';
import Slide from '@material-ui/core/Slide';


const Navbar = (props) => {

    // Redux
    const { text, severity } = props.message
    const { clearMessage, user } = props


    // React
    const initialState = {
        color: null,
    }
    const [state, setState] = useState(initialState)

    useEffect(() => {
        text !== null && window.setTimeout(() => {
            clearMessage();
        }, 5000);
        user.userProfile && setState(state => setState({
            ...state,
            color: user.userProfile.color
        }))
        return () => {
            setState({
                ...state,
                color: null
            })
        }
    }, [text, clearMessage, user.userProfile])

    // Material UI
    const useStyles = makeStyles(theme => (
        {
            circleButton: {
                borderRadius: theme.spacing(10),
                minWidth: 0,
                padding: " 8px 10px",
                fontSize: "1.5rem",
                boxShadow: "none",
                lineHeight: "1rem",
                letterSpacing: 0,
                backgroundColor: "transparent",
                "&:hover": {
                    background: "none",
                    boxShadow: "none"
                }
            },
            message: {
                borderRadius: "0"
            },
            avatar: {
                backgroundColor: `${(state && state.color) ? getColorValue(state.color) : getColorValue(user.color)}`,
                margin: "auto",
                "&:hover": {
                    opacity: "0.9",
                }
            },
            link: {
                textDecoration: "none",
                color: "white"
            },
            logo: {
                width: "63px",
                outline: "none"
            }
        }
    ))


    const classes = useStyles()

    return (
        <AppBar>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={2} >
                        <Link className={classes.link} to="/">
                            <Slide appear direction="left" in={state && state.color !== null} mountOnEnter unmountOnExit>
                                <img src={logo} className={classes.logo} alt="iFam Logo" />
                            </Slide>
                        </Link>

                    </Grid>
                    <Grid item xs>
                        {state && state.color === null &&
                            <Link className={classes.link} to="/">
                                <img src={logo} className={classes.logo} alt="iFam Logo" />
                            </Link>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        {user.userProfile ?
                            <Avatar className={classes.avatar}>
                                <CustomButton
                                    variant="contained"
                                    color="primary"
                                    className={classes.circleButton}
                                    onClick={props.handleOnClick}
                                    list={props.list}
                                >
                                    {user.userProfile.email.charAt(0)}
                                </CustomButton>
                            </Avatar>
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
        user: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearMessage: () => dispatch(clearMessage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);