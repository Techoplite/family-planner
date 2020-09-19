import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import TemporaryDrawer from './components/TemporaryDrawer';
import Anonymous from './components/Anonymous';
import Authenticated from './components/Authenticated';
import { BrowserRouter as Router } from 'react-router-dom'


const App = (props) => {

  // Redux
  const { auth } = props

  // React
  const initialState = {
    temporaryDrawer: false,
  }
  const [state, setState] = useState(initialState)

  const handleOnClick = (e) => {
    e.preventDefault()
    setState({
      ...state,
      temporaryDrawer: true
    })
  }

  // Material UI
  const useStyles = makeStyles(theme => ({
    mainContent: {
      marginTop: theme.spacing(15),
      display: "flex",
      justifyContent: "center",
      width: "100%",
      padding: `0 ${theme.spacing(2)}px`
    },
    App: {
      marginBottom: "2rem"
    }
  }))
  const classes = useStyles()

  return (
    <Router>
        <div className={classes.App}>
          <Grid container>
            <Grid item xs={12}>
              <Navbar
                handleOnClick={handleOnClick}
              />
            </Grid>
            <div className={classes.mainContent}>
              <Grid item xs={12} sm={8}>
                <TemporaryDrawer
                  handleOnClick={handleOnClick}
                  open={state.temporaryDrawer}
                  setState={setState}
                />
                {auth.isEmpty ? <Anonymous /> : <Authenticated />}
              </Grid>
            </div>
          </Grid>
        </div>
    </Router>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(App);
