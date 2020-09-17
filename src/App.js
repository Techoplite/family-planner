import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux'
import TemporaryDrawer from './components/TemporaryDrawer';
import Anonymous from './components/Anonymous';
import Authenticated from './components/Authenticated';

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
    setOpen(true)
  }

  const [open, setOpen] = useState(initialState)
  const initialMessage = ""
  const [message, setMessage] = useState(initialMessage)
  const initialSeverity = "info"
  const [severity, setSeverity] = useState(initialSeverity)


  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <Navbar auth={auth} handleOnClick={handleOnClick} message={message} severity={severity} />
        </Grid>
        <div className={classes.mainContent}>
          <Grid item xs={12}>
            <TemporaryDrawer
              handleOnClick={handleOnClick}
              open={open}
              setOpen={setOpen}
              setMessage={setMessage}
              setSeverity={setSeverity}/>
            {auth.email ? <Authenticated setMessage={setMessage} setSeverity={setSeverity} /> : <Anonymous setMessage={setMessage} setSeverity={setSeverity} />}
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);
