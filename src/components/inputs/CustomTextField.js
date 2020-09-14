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

    const { label, value, name, onChange, ...others } = props;

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
            {...others}
        />
    );
}

export default CustomTextField;