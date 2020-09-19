import React, { useState, useEffect } from 'react'
import { Drawer, makeStyles, ListItem, ListItemText, List } from '@material-ui/core'
import { logout } from './../store/actions/auth'
import { connect } from 'react-redux'
import { setMessage } from './../store/actions/message'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'




const TemporaryDrawer = (props) => {
    // Redux
    const { auth } = props

    // React
    const initialState = {
        list: []
    }
    const [state, setState] = useState(initialState)

    const handleOnClose = e => {
        e.preventDefault()
        props.setState({
            ...props.state,
            temporaryDrawer: false
        })
    }
    const getLink = (text) => {
        switch (text) {
            case 'Log in':
                return '/login'
            case 'Sign up':
                return '/signup'
            default:
                return ''
        }
    }

    useEffect(() => {
        const getList = () => {
            auth && auth.isEmpty ?
                setState(state => ({
                    ...state,
                    list: ['Log in', 'Sign up']
                })) :
                setState(state => ({
                    ...state,
                    list: ['Log out']
                }))
        };
        getList()
    }, [auth.isEmpty, auth])

    const handleOnClick = (e) => {
        e.preventDefault()
        if (e.currentTarget.children[0].innerText === 'Log out') {
            props.logout()
            props.setMessage("Logout successful.", "success")
            props.setState({
                ...props.state,
                temporaryDrawer: false
            })
        }
        props.setState({
            ...props.state,
            temporaryDrawer: false
        })

    }

    // Material UI
    const useStyles = makeStyles(theme => ({
        link: {
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(1)

        },
        ExitToAppIcon: {
            marginRight: theme.spacing(1)
        },
    }))

    const classes = useStyles()

    return (
        <Drawer
            open={props.open}
            anchor="right"
            onClose={handleOnClose}>
            <List>
                {state.list && state.list.map(text =>

                    <ListItem
                        button
                        onClick={handleOnClick}
                        key={text}
                    >
                        <Link
                            to={getLink(text)}
                            className={classes.link}>
                            <ExitToAppIcon
                                className={classes.ExitToAppIcon}
                                color="action"
                            />
                            <ListItemText
                                primary={text}
                            />
                        </Link>
                    </ListItem>
                )}
            </List>
        </Drawer >
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        setMessage: (text, severity) => dispatch(setMessage(text, severity))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);