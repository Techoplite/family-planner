import React from 'react'
import Login from './Login'

const Anonymous = (props) => {
    

    return (<Login setMessage={props.setMessage} setSeverity={props.setSeverity}/>);
}

export default Anonymous;