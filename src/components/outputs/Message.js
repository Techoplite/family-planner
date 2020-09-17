import { Alert } from '@material-ui/lab';
import React from 'react';
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => (
    {
        circleButton: {
            borderRadius: theme.spacing(10),
            minWidth: 0,
            padding: "6px 14px",
            backgroundColor: "coral", //temporary
            fontSize: "1rem",
            boxShadow: "none"
        },
        message: {
            borderRadius: "0"
        }
    }
))

const Message = (props) => {

    const classes = useStyles()

    const { message, severity } = props

    return (
        <Alert className={classes.message} severity={severity}>{message}</Alert>
    );
}

export default Message;