import React from 'react'
import Login from './Login'

const Anonymous = (props) => {
    

    return (<Login auth={props.auth} setMessage={props.setMessage} setSeverity={props.setSeverity}/>);
}

export default Anonymous;