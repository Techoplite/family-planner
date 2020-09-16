import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import TemporaryDrawer from './components/TemporaryDrawer';

const useStyles = makeStyles(theme => ({
  mainContent: {
    marginTop: theme.spacing(15),
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: `0 ${theme.spacing(2)}px`
  }
}))




const App = (props) => {
  const classes = useStyles()

  const { auth } = props

  const initialState = false


  const handleOnClick = (e) => {
    e.preventDefault()
    setState(true)
  }

  const [state, setState] = useState(initialState)


  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <Navbar auth={auth} handleOnClick={handleOnClick} />
        </Grid>
        <div className={classes.mainContent}>
          <Grid item xs={12}>
            <TemporaryDrawer
              handleOnClick={handleOnClick}
              state={state}
              setState={setState} />
            <Login />
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth.email
  }
}

export default connect(mapStateToProps)(App);
