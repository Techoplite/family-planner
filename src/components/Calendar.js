import React from 'react'
import {
    Redirect, withRouter, Route, Switch, useRouteMatch
} from 'react-router-dom'
import EventForm from './EventForm'
import { connect } from 'react-redux'
import EventList from './EventList'


const Calendar = (props) => {

    //React Router DOM
    const { path, url } = useRouteMatch()
    console.log('path, url :>> ', path, url);

    // Redux 
    const { auth } = props

    return (
        <>
            
            {auth.family && auth.family.events.length > 0 ?
                <Redirect to={`${url}/events`} />
                :
                <Redirect to={`${url}/add-event`} />
            }
            <Switch>
                <Route exact path={`${path}/events`} component={EventList} />
                <Route exact path={`${path}/add-event`} component={EventForm} />
            </Switch>
        </>
    );
}

// Redux
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Calendar));