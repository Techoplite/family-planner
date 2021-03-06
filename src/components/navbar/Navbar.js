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
import Zoom from '@material-ui/core/Zoom';


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
            },
            appBar: {
                zIndex: 1
            }
        }
    ))


    const classes = useStyles()

    return (
        <AppBar data-test='appBar' className={classes.appBar}>
            <Toolbar data-test='toolbar'>
                <Grid data-test='grid-container' container alignItems="center">
                    <Grid data-test='grid-item-xs2' item xs={2} >
                        <Link data-test='link-to-home' className={classes.link} to="/">
                            <Slide data-test='slide' appear direction="left" in={state && state.color !== null} mountOnEnter unmountOnExit>
                                <img data-test='image' src={logo} className={classes.logo} alt="iFam Logo" />
                            </Slide>
                        </Link>

                    </Grid>
                    <Grid data-test='grid-item-xs' item xs>
                        {state && state.color === null ?
                            <Link data-test='link-to-home' className={classes.link} to="/">
                                <img data-test='image' src={logo} className={classes.logo} alt="iFam Logo" />
                            </Link>
                            :
                            <Zoom appear in={user.family !== undefined} mountOnEnter unmountOnExit exit={true} timeout={{
                                appear: 500,
                                enter: 300,
                                exit: 500,
                            }}>
                                <Typography variant="h6">
                                    the {user.family && user.family.surname}'s
                            </Typography>
                            </Zoom>
                        }

                    </Grid>
                    <Grid data-test='grid-item-xs2' item xs={2}>
                        {user.userProfile ?
                            <Avatar data-test='avatar' className={classes.avatar}>
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
                                data-test='accountCircleOutlinedIcon'
                                fontSize="large"
                                onClick={props.handleOnClick}
                                list={props.list}

                            />}

                    </Grid>
                </Grid>
            </Toolbar>
            {text && <Message data-test='message' message={text} severity={severity} />}
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