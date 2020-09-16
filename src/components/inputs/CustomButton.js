import React from 'react'
import { Button } from '@material-ui/core'



const CustomButton = (props) => {

    const { variant, ...others } = props


    return (<Button
        variant={variant}
        {...others}
    />);
}

export default CustomButton;