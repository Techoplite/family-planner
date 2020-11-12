import React from 'react'
import { withRouter, Route, Switch, useRouteMatch} from 'react-router-dom'
import EventForm from './EventForm'
import { connect } from 'react-redux'
import EventList from './EventList'


const Calendar = () => {

    //React Router DOM
    const { path } = useRouteMatch()

    return (
        <>
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