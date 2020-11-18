import React from 'react';
import { TextField, makeStyles } from '@material-ui/core'




const CustomTextField = (props) => {

    // React
    const { label, value, name, onChange, error = null, ...others } = props;

    // Material UI
    const useStyles = makeStyles(theme => (
        {
            textField: {
                marginTop: theme.spacing(3),
            },
        }
    ))

    const classes = useStyles()

    return (
        <TextField
            data-test="text-field"
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