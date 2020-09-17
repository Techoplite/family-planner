import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => (
    {
        button: {
            marginTop: theme.spacing(3)
        },
    }
))


const CustomButton = (props) => {

    const classes = useStyles()

    const { variant, ...others } = props


    return (<Button
        variant={variant}
        className={classes.button}
        {...others}
    />);
}

export default CustomButton;