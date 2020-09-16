import React from 'react'
import { Drawer, makeStyles, ListItem, ListItemText, List } from '@material-ui/core'

const useStyles = makeStyles({
    temporaryDrawer: {

    }
})


const TemporaryDrawer = (props) => {


    const classes = useStyles()

    const list = ['Log Out']



    const handleOnClose = (e) => {
        e.preventDefault()
        props.setState(false)
    }


    return (
        < Drawer className={classes.temporaryDrawer} open={props.state} anchor="right" onClose={handleOnClose}>
            <List>
                {list.map(text =>
                    <ListItem button key={text} onClick={props.handleOnClick}>
                        <ListItemText primary={text} />
                    </ListItem>
                )}
            </List>
        </Drawer >
    );
}

export default TemporaryDrawer;