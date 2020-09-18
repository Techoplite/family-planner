import React from 'react'
import { Button, makeStyles } from '@material-ui/core'




const CustomButton = (props) => {

    // React
    const { variant, ...others } = props


    // Material UI
    const useStyles = makeStyles(theme => (
        {
            button: {
                marginTop: theme.spacing(3)
            },
        }
    ))

    const classes = useStyles()

    return (<Button
        variant={variant}
        className={classes.button}
        {...others}
    />);
}

export default CustomButton;