import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import Section from './Section'
import { Grid, makeStyles } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Link, Switch, Route } from 'react-router-dom'
import Calendar from './Calendar'
import ShoppingList from './ShoppingList'
import TodoList from './TodoList'
import EventList from './EventList';
import EventForm from './EventForm';




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
            textDecoration: "none",
            "&:hover": {
                // need to change color on over
            }
        }
    }))
    const classes = useStyles()

    return (
        <>
            {/* {auth.userProfile.email && <Redirect to='/' />} */}
            <Switch>
                <Route exact path="/">
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
                <Route path="/calendar" component={Calendar} />
                <Route path="/shopping-list" component={ShoppingList} />
                <Route path="/todo-list" component={TodoList} />
                <Route path={`calendar/events`} component={EventList} />
                <Route path={`calendar/add-event`} component={EventForm} />
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

export default withRouter(connect(mapStateToProps)(Authenticated));