import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import TemporaryDrawer from './components/TemporaryDrawer';
import Anonymous from './components/Anonymous';
import Authenticated from './components/Authenticated';
import { setMessage, clearMessage } from './store/actions/message'
import { logout } from './store/actions/auth'

const App = (props) => {

  // Redux
  const { text, auth } = props

  // React
  const initialState = {
    temporaryDrawer: false
  }
  const [state, setState] = useState(initialState)

  const handleOnClick = (e) => {
    e.preventDefault()
    setState({
      ...state,
      temporaryDrawer: true
    })
  }

  // useEffect(() => {
  //   text !== "" && window.setTimeout(() => {
  //     props.clearMessage();
  //   }, 5000);
  //   return () => props.logout()
  // }, [props, text])

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

  console.log('text :>> ', text);
  console.log('auth :>> ', auth);


  return (
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
  );
}


// Redux
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    text: state.message.text,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    setMessage: (text, severity) => dispatch(setMessage(text, severity)),
    clearMessage: () => dispatch(clearMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
