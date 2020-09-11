import React from 'react';
import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => (
    {
        TextField: {
            marginTop: theme.spacing(3)
        },
    }
))


const CustomTextField = (props) => {

    const { label, value, name, autoFocus, required, onChange } = props;

    const classes = useStyles()

    return (
        <TextField
            fullWidth
            variant="outlined"
            required={required}
            label={label}
            name={name}
            autoFocus={autoFocus}
            className={classes.TextField}
            value={value}
            onChange={onChange}
            autoComplete="off"
        />
    );
}

export default CustomTextField;