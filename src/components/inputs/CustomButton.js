import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => (
    {
        button: {
            marginTop: theme.spacing(3)
        }
    }
)
)

const CustomButton = (props) => {

    const { variant, ...others } = props

    const classes = useStyles()

    return (<Button
        variant={variant}
        {...others}
        className={classes.button}
    />);
}

export default CustomButton;