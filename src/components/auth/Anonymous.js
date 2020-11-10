import React from 'react'
import Login from '../Login'
import Signup from '../Signup'
import { Link, Route, Switch } from 'react-router-dom'
import { Button, makeStyles, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import AuthenticatedIphone from './../../Authenticated.png'



const Anonymous = () => {
    // Material UI

    const useStyles = makeStyles(theme => ({
        jumbotron: {
            height: "70vh",
            marginTop: "56px",
            padding: 0,
            margin: 0,
            borderBottom: "5px solid lightgrey"
        },
        authenticatedIphone: {
            position: "absolute",
            transform: "translate(-50%, 0)",
            zIndex: -1,
            width: "200px",
        },
        jumboText: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            width: "60%",
            margin: "auto",
            color: "#3f51b5",
            fontWeight: "bold",
        },
        appDescription: {
            height: "80vh",
            backgroundColor: "white"
        },
        descriptionHeading: {
            color: "#3f51b5",
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            width: "80%",
            margin: "auto",
            textAlign: "left"
        },
        auth: {
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "#3f51b5",
            flexDirection: "column",
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
        },
        button: {
            color: "#3f51b5",
            backgroundColor: "white",
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        authText: {
            marginTop: theme.spacing(4),
            color: "white",
        },
        buttonsGroup: {
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly"
        },
        subtitle: {
            textAlign: "left",
            width: "80%",
            margin: "auto"
        },
        ul: {
            marginTop: theme.spacing(2),
            width: "80%",
            margin: "auto",
            textAlign: "left",
            fontSize: "1.7rem",
        },
        li: {
            color: "#3f51b5",
            "& p": {
                color: "black",
                marginRight: theme.spacing(2),
                verticalAlign: "baseline"
            },
            marginTop: theme.spacing(1.5),
        },
        link: {
            textDecoration: "none"
        }
    }))
    const classes = useStyles()
    return (
        <Switch>
            <Route exact path="/">
                <Container fullWidth className={classes.jumbotron}>
                    <Typography variant="h4" className={classes.jumboText}>The family planner in just one click</Typography>
                    <img src={AuthenticatedIphone} alt="Home page on Iphone" className={classes.authenticatedIphone} />
                </Container>
                <Container fullWidth className={classes.auth}>
                    <Typography variant="h4" className={classes.authText}>It's never been so easy...</Typography>
                    <div className={classes.buttonsGroup}>
                        <Link className={classes.link} to="/signup">
                            <Button variant="contained" size="large" className={classes.button}>Sign Up</Button>
                        </Link>
                        <Link className={classes.link} to="/login">
                            <Button variant="contained" className={classes.button} size="large">Log In</Button>
                        </Link>
                    </div>
                </Container>
                <Container fullWidth className={classes.appDescription}>
                    <Typography variant="h4" className={classes.descriptionHeading}>Keep you family organised, no more headaches.</Typography>
                    <Typography variant="h6" className={classes.subtitle}>With iFam you can:</Typography>
                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <Typography variant="body1" >Keep appointments an activities all in one place</Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography variant="body1" >Manage a shared shopping list, and to-do list</Typography>
                        </li>
                    </ul>
                </Container>

            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    );
}

export default Anonymous;