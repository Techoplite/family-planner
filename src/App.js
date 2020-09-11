import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainContent: {
    marginTop: theme.spacing(15),
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: `0 ${theme.spacing(2)}px`
  }
}))

function App() {
  const classes = useStyles()

  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <div className={classes.mainContent}>
          <Grid item xs={12}>
            <Login />
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

export default App;
