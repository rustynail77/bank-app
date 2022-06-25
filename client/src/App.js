import React, { useState, useEffect, createContext } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/bank.png';

import SearchBar from './components/SearchBar/SearchBar';

export const AppContext = createContext(null);

const App = () => {
  const [cities, setCities] = useState();
  const [currentId, setCurrentId] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <AppContext.Provider value={{
        filteredPosts, setFilteredPosts, 
        cities, setCities
        }}>
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">Bank Clients</Typography>
          <img className={classes.image} src={memories} alt="icon" height="60" />
        </AppBar>
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <SearchBar />  
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </AppContext.Provider>
  );
};

export default App;
