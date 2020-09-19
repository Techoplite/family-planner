import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const Authenticated = (props) => {
    // Redux
    const { auth } = props

    return (
        <>
            <div>not anonymous</div>
            {auth.isEmpty === false && <Redirect to='/' />}
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Authenticated);