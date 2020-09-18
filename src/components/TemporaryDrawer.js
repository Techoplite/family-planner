import React from 'react'
import { Drawer, makeStyles, ListItem, ListItemText, List } from '@material-ui/core'
import { logout } from './../store/actions/auth'
import { connect } from 'react-redux'
import { setMessage } from './../store/actions/message'




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
    const useStyles = makeStyles({
        temporaryDrawer: {

        }
    })

    const classes = useStyles()

    const list = ['Log Out']

    return (
        <Drawer className={classes.temporaryDrawer} open={props.open} anchor="right" onClose={handleOnClose}>
            <List>
                {list.map(text =>
                    <ListItem button key={text} onClick={handleOnClick}>
                        <ListItemText primary={text} />
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