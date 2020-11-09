import React, { useState, useEffect } from 'react'
import { Drawer, makeStyles, ListItem, ListItemText, List, Divider } from '@material-ui/core'
import { logout } from './../store/actions/auth'
import { connect } from 'react-redux'
import { setMessage } from './../store/actions/message'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link, Redirect } from 'react-router-dom'
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';



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

    useEffect(() => {
        const getList = () => {
            auth && auth.isEmpty ?
                setState(state => ({
                    ...state,
                    list: [
                        {
                            name: 'Log in',
                            link: '/login',
                            TagName: VpnKeyIcon
                        },
                        {
                            name: 'Sign up',
                            link: '/signup',
                            TagName: AccountCircleIcon
                        }
                    ]
                })) :
                setState(state => ({
                    ...state,
                    list: [
                        {
                            name: 'Log out',
                            link: '/logout',
                            TagName: ExitToAppIcon
                        },
                        {
                            name: 'Events',
                            link: '/calendar/events',
                            TagName: TodayIcon
                        },
                        {
                            name: 'Add event',
                            link: '/calendar/add-event',
                            TagName: EventIcon
                        },
                        {
                            name: 'Shopping List',
                            link: '/shopping-list/shopping-list-items',
                            TagName: ShoppingCartIcon
                        },
                        {
                            name: 'Add shopping item',
                            link: '/shopping-list/add-shopping-item',
                            TagName: AddShoppingCartIcon
                        },
                        {
                            name: 'To-do list',
                            link: '/todo-list',
                            TagName: FormatListBulletedIcon
                        },
                    ]
                }))
        };
        getList()
    }, [auth.isEmpty, auth])

    const handleOnClick = (e) => {
        e.preventDefault()
        if (e.target.innerText === 'Log out') {
            console.log("code reached here")
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

    const getTagName = (item) => {
        const TagName = item.TagName
        return (
            <TagName
                className={classes.ExitToAppIcon}
                color="action"
            />
        )
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
        <>
            { auth.email === undefined && <Redirect to='/' />}
            <Drawer
                open={props.open}
                anchor="right"
                onClose={handleOnClose}>
                <List>
                    {state.list && state.list.map(item =>
                        <React.Fragment
                            key={item.name}
                        >
                            <ListItem
                                button
                                onClick={handleOnClick}
                                key={item.name}
                            >
                                {getTagName(item)}
                                <Link
                                    to={item.link}
                                    className={classes.link}>

                                    <ListItemText
                                        primary={item.name}
                                    />
                                </Link>
                            </ListItem>
                            {(item.name === 'Log out' || item.name === 'Add event' || item.name === 'Add shopping item') && <Divider />}
                        </React.Fragment>
                    )}
                </List>
            </Drawer >
        </>
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