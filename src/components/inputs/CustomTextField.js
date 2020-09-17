import React from 'react';
import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => (
    {
        textField: {
            marginTop: theme.spacing(3)
        },
    }
))


const CustomTextField = (props) => {

    const { label, value, name, onChange, error = null, ...others } = props;

    const classes = useStyles()

    return (
        <TextField
            fullWidth
            variant="outlined"
            label={label}
            name={name}
            className={classes.textField}
            value={value}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
            {...others}
        />
    );
}

export default CustomTextField;