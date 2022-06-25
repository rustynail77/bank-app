import React, { useContext, useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {AppContext} from '../../App';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  
  const {filteredPosts, cities, setCities} = useContext(AppContext);
  const allPosts = useSelector((state) => state.posts);
  // console.log('allPosts.length:',allPosts.length);
  const posts = (filteredPosts&&filteredPosts.length>0) ? filteredPosts : allPosts;
  const classes = useStyles();
  // console.log('posts.length:', posts.length);
  
  useEffect (()=>{
    const setTheCities = () => {
      // console.log('checking cities');
      if (posts.length>0 && !cities) {
        // console.log('entered if');
        let cityList = [];
        posts.map(post=>{
          if (!cityList.includes(post.city) &&post.city && post.city!=='') cityList.push(post.city)
        });
        // console.log('city list:',cityList);
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
