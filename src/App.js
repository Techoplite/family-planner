import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <div>
          <Grid item xs={8}>
            <Login />
          </Grid>
        </div>

      </Grid>
    </div>
  );
}

export default App;
