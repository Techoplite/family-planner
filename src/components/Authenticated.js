import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Section from './Section'
import { Grid, makeStyles } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Link, Switch, Route} from 'react-router-dom'
import Calendar from './Calendar'
import ShoppingList from './ShoppingList'
import TodoList from './TodoList'




const Authenticated = (props) => {
    // Redux
    const { auth } = props

    // Material UI
    const useStyles = makeStyles(theme => ({
        container: {
            height: "calc(100vh - 56px - 120px)",
            marginTop: "-50px"
        },
        icon: {
            fontSize: "5rem",
            color: "white",
        },
        link: {
            textDecoration: "none"
        }
    }))
    const classes = useStyles()

    return (
        <>
            <Switch>
                <Route exact path="/">
                    {auth.email && <Redirect to='/' />}
                    This is a work in progress...
                <Grid container justify="center" alignItems="center" align="center" className={classes.container}>
                    <Grid item xs={8} sm={12}>
                        <Link className={classes.link} to="/calendar">
                            <Section header="Calendar" icon={<EventIcon className={classes.icon} />} />
                        </Link>
                    </Grid>
                    <Grid item xs={8} sm={12}>
                        <Link className={classes.link} to="/shopping-list">
                            <Section header="Shopping List" icon={<ShoppingCartIcon className={classes.icon} />} />
                        </Link>
                    </Grid>
                    <Grid item xs={8} sm={12}>
                        <Link className={classes.link} to="/todo-list">
                            <Section header="To Do List" icon={<FormatListBulletedIcon className={classes.icon} />} />
                        </Link>
                    </Grid>
                    </Grid>
                </Route>
                This is a work in progress....
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/shopping-list" component={ShoppingList} />
                <Route exact path="/todo-list" component={TodoList} />
            </Switch>
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