import React from 'react'
import { Drawer, makeStyles, ListItem, ListItemText, List } from '@material-ui/core'
import { logout } from './../store/actions/auth'
import { connect } from 'react-redux'

const useStyles = makeStyles({
    temporaryDrawer: {

    }
})


const TemporaryDrawer = (props) => {


    const classes = useStyles()

    const list = ['Log Out']

    const { setMessage, setSeverity } = props

    const handleOnClose = e => {
        e.preventDefault()
        props.setOpen(false)
    }

    const handleOnClick = e => {
        e.preventDefault()
        props.logout()
        setSeverity("success")
        setMessage("Logout successful.")
        props.setOpen(false)
    }


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
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(TemporaryDrawer);