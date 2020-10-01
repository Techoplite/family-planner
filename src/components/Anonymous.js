import React from 'react'
import Login from './Login'
import Signup from './Signup'
import { Route, Switch } from 'react-router-dom'


const Anonymous = () => {

    return (
        <Switch>
            This is a work in progress....
            <Route exact path="/"><div>home page</div></Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    );
}

export default Anonymous;