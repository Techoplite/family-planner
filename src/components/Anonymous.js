import React from 'react'
import Login from './Login'
import Signup from './Signup'
import { Route, Switch } from 'react-router-dom'


const Anonymous = () => {

    return (
        <Switch>
            <Route exact path="/">
                <div>home page</div>
                <p>This is a work in progress....</p>

                <p>At the moment I have only implemented the authentication system,
            so feel free to sign up with a dummy email and password.</p>

                <p>As I develop following a 'mobile-first' approach, if you are viewing it on a deskop screen you might want to righ-click on this webpage, select 'inspect' and then press 'Ctrl + Shift + M'</p>

            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    );
}

export default Anonymous;