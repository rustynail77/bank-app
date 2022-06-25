import React, { useContext, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {AppContext} from '../../App';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  
  const {filteredPosts, cities, setCities} = useContext(AppContext);
  const allPosts = useSelector((state) => state.posts);
  const posts = (filteredPosts && filteredPosts.length>0) ? filteredPosts : allPosts;
  const classes = useStyles();
  
  useEffect (()=>{
    const setTheCities = () => {
      if (posts.length>0 && !cities) {
        let cityList = [];
        posts.map(post=>{
          if (!cityList.includes(post.city) &&post.city && post.city!=='') cityList.push(post.city)
        });
        cityList.sort(function(a, b) {
          const cityA = a.toUpperCase();
          const cityB = b.toUpperCase();
          if (cityA < cityB) return -1;
          if (cityA > cityB) return 1;
        });
        setCities(cityList);
      }
    }
    setTheCities();
  }) 
  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
