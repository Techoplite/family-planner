import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import TemporaryDrawer from './components/TemporaryDrawer';
import Anonymous from './components/Anonymous';
import Authenticated from './components/Authenticated';
import { setMessage, clearMessage } from './store/actions/message'

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




const App = (props) => {
  const classes = useStyles()

  const { auth } = props

  const initialState = false



  const handleOnClick = (e) => {
    e.preventDefault()
    setOpen(true)
  }

  const [open, setOpen] = useState(initialState)

  const initialSeverity = "info"
  const [severity, setSeverity] = useState(initialSeverity)

  const { text } = props


  useEffect(() => {
    text !== "" && window.setTimeout(() => {
      props.clearMessage();
    }, 5000);
  }, [props, text])


  return (
    <div className={classes.App}>
      <Grid container>
        <Grid item xs={12}>
          <Navbar
            auth={auth}
            handleOnClick={handleOnClick}
            severity={severity}
            message={props.text} />
        </Grid>
        <div className={classes.mainContent}>
          <Grid item xs={12} sm={8}>
            <TemporaryDrawer
              handleOnClick={handleOnClick}
              open={open}
              setOpen={setOpen}
              setMessage={setMessage}
              setSeverity={setSeverity} />
            {auth.email ? <Authenticated setMessage={setMessage} setSeverity={setSeverity} /> : <Anonymous auth={auth} setMessage={setMessage} setSeverity={setSeverity} />}
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    text: state.text
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMessage: (text, severity) => dispatch(setMessage(text, severity)),
    clearMessage: () => dispatch(clearMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
