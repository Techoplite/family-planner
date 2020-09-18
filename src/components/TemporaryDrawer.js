import React from 'react'
import { Drawer, makeStyles, ListItem, ListItemText, List } from '@material-ui/core'
import { logout } from './../store/actions/auth'
import { connect } from 'react-redux'
import { setMessage } from './../store/actions/message'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';




const TemporaryDrawer = (props) => {

    // React
    const handleOnClose = e => {
        e.preventDefault()
        props.setState({
            ...props.state,
            temporaryDrawer: false
        })
    }

    const handleOnClick = e => {
        e.preventDefault()
        props.logout()
        props.setMessage("Logout successful.", "success")
        props.setState({
            ...props.state,
            temporaryDrawer: false
        })
    }

    // Material UI
    const useStyles = makeStyles(theme => ({
        list: {
            width: "200px",
            display: "flex",
            justifyContent: "center"

        },
        listItem: {
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            width: "fit-content"

            // dispaly: "flex",

        },
        listItemText: {
            // width: "fit-content"
        },
        ExitToAppIcon: {
            marginRight: theme.spacing(1)
        },
    }))

    const classes = useStyles()

    const list = ['Log Out']

    return (
        <Drawer
            open={props.open}
            anchor="right"
            onClose={handleOnClose}>
            <List
                className={classes.list}
            >
                {list.map(text =>
                    <ListItem
                        button key={text}
                        onClick={handleOnClick}
                        className={classes.listItem}

                    >
                        <ExitToAppIcon
                            className={classes.ExitToAppIcon}
                            color="action"
                        />
                        <ListItemText
                            primary={text}
                            className={classes.listItemText}

                        />
                    </ListItem>
                )}
            </List>
        </Drawer >
    );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        setMessage: (text, severity) => dispatch(setMessage(text, severity))
    }
}

export default connect(null, mapDispatchToProps)(TemporaryDrawer);