import React from 'react'
import Login from '../Login'
import Signup from '../Signup'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';



const Anonymous = () => {
    // Material UI

    const useStyles = makeStyles(theme => ({
        container: {
            height: "200px",
            backgroundColor: "red",
            marginTop: "-88px",
            padding: 0,
            margin: 0,
        }
    }))
    const classes = useStyles()
    return (
        <Switch>
            <Route exact path="/">
                <Container fullWidth className={classes.container}>
                </Container>

            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    );
}

export default Anonymous;