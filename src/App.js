import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import TemporaryDrawer from './components/TemporaryDrawer';
import Anonymous from './components/auth/Anonymous';
import Authenticated from './components/auth/Authenticated';
import { BrowserRouter as Router } from 'react-router-dom'
import { getUserProfile } from './store/actions/auth';



const App = (props) => {

  // Redux
  const { auth, user, getUserProfile } = props

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

  useEffect(() => {
    auth.email && getUserProfile(auth.email)
  }, [auth.email, getUserProfile])

  // Material UI
  const useStyles = makeStyles(theme => ({
    mainContent: {
      marginTop: theme.spacing(18),
      display: "flex",
      justifyContent: "center",
      width: "100%",
      padding: `0 ${theme.spacing(2)}px`,
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
          {!user.userProfile ?
            <Grid item xs={12}>
              <TemporaryDrawer
                handleOnClick={handleOnClick}
                open={state.temporaryDrawer}
                setState={setState}
              />
              <Anonymous />
            </Grid> :
            <div className={classes.mainContent}>
              <Grid item xs={12} sm={8}>
                <TemporaryDrawer
                  handleOnClick={handleOnClick}
                  open={state.temporaryDrawer}
                  setState={setState}
                />
                <Authenticated />
              </Grid>
            </div>
          }

        </Grid>
      </div>
    </Router>
  );
}

// Redux
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    user: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: (email) => dispatch(getUserProfile(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
