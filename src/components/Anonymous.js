import React from 'react'
import Login from './Login'
import { Route, Switch } from 'react-router-dom'


const Anonymous = () => {

    return (
        <Switch>

            <Route exact path="/"><div>home page</div></Route>
            <Route exact path="/login" component={Login} />
        </Switch>
    );
}

export default Anonymous;