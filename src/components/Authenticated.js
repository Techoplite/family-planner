import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const Authenticated = (props) => {
    // Redux
    const { auth } = props

    return (
        <>
            <div>Hi {auth.name}, welcome to the home page.</div>
            <p>This is only a temporary page.</p>
            {auth.isEmpty === false && <Redirect to='/' />}
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(Authenticated);