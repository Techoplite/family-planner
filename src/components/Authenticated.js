import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Section from './Section'
import { Grid, makeStyles } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';




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
            fontSize: "10vh",
            color: "white",
        },
        gridItem: {
            height: "20vh"
        }
    }))
    const classes = useStyles()

    return (
        <>
            {auth.email && <Redirect to='/' />}
            <Grid container direction="column" justify="center" alignItems="center" align="center" className={classes.container}>
                <Grid item xs={3} className={classes.gridItem}>
                    <Section header="Calendar" icon={<EventIcon className={classes.icon} />} />
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Section header="Shopping List" icon={<ShoppingCartIcon className={classes.icon} />} />
                </Grid>
                <Grid item xs={3} className={classes.gridItem}>
                    <Section header="To Do List" icon={<FormatListBulletedIcon className={classes.icon} />} />
                </Grid>
            </Grid>
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