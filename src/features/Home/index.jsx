import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

HomeFeature.propTypes = {};
const useStyle = makeStyles({
  btn: {
    backgroundColor: '#2980b9',
  },
});

function HomeFeature(props) {
  const classes = useStyle();
  return (
    <div>
      <Box
        width="100%"
        height="74vh"
        style={{
          backgroundImage: 'url(http://nordic-static-cart.surge.sh/images/slider_1.jpg)',
        }}
      >
        <Container>
          <Box
            width="60%"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            textAlign="start"
            justifyContent="center"
          >
            <Typography>SPRING / SUMMER COLLECTION 2021</Typography>
            <Typography variant="h2" component="h1">
              Get up to 30% Off New Arrivals
            </Typography>
            <Button color="primary" variant="contained" className={classes.btn}>
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default HomeFeature;
