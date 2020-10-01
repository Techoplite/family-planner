import React from 'react'
import { makeStyles, Typography } from '@material-ui/core';


const Section = (props) => {
    // Material UI
    const { icon, header } = props

    const useStyles = makeStyles(theme => ({
        section: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#3f51b5",
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            borderRadius: theme.spacing(1),
            
        },
        header: {
            color: "white",
            padding: theme.spacing(1)
        }
    }))
    const classes = useStyles()

    return (
        <div className={classes.section}>
            <div><Typography className={classes.header}>{header}</Typography></div>
            <div>{icon}</div>
        </div>
    );
}

export default Section;