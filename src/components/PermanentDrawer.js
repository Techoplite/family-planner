import React, { useState, useEffect } from 'react'
import { Drawer, makeStyles, ListItem, ListItemText, List, Divider } from '@material-ui/core'
import { logout, redirectPath } from './../store/actions/auth'
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

const PermanentDrawer = (props) => {
    // Redux
    const { auth } = props

    const drawerWidth = 240;

    // React
    const initialState = {
        list: []
    }
    const [state, setState] = useState(initialState)

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

    const handleOnClick = (e, path) => {
        e.preventDefault()
        if (e.target.innerText === 'Log out') {
            props.logout()
            props.setMessage("Logout successful.", "success")
        }
        if (e.target.innerText === 'Add event' || e.target.innerText === 'Add shopping item') {
            props.redirectPath(path)
        }
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
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth,
            marginTop: "64px",
            zIndex: 0
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        link: {
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",

        },
        ExitToAppIcon: {
            marginRight: theme.spacing(1)
        },
        listItem: {
            marginLeft: theme.spacing(3)
        }
    }));
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            {state.list && state.list.map(item =>
                <List key={item.name}>
                    <React.Fragment
                        key={item.name}
                    >
                        <ListItem
                            button
                            onClick={(e, path) => handleOnClick(e, item.link)}
                            key={item.name}
                            className={classes.listItem}
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
                </List>
            )}
        </Drawer>
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
        setMessage: (text, severity) => dispatch(setMessage(text, severity)),
        redirectPath: (path) => dispatch(redirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PermanentDrawer);