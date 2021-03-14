import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CategoryCard from './components/CategoryCard';

HomeFeature.propTypes = {};
const useStyle = makeStyles({
  btn: {
    marginTop: 20,
    backgroundColor: '#2980b9',
    width: 250,
    '&:hover': {
      backgroundColor: '#3498db',
    },
  },
});

function HomeFeature(props) {
  const classes = useStyle();

  const history = useHistory();
  const handleOnShopClick = () => {
    history.push('/products');
  };
  return (
    <div>
      <Box
        width="100%"
        height="74vh"
        style={{
          backgroundImage: 'url(./images/slider_1.jpg)',
        }}
      >
        <Container style={{ height: '100%' }}>
          <Box
            height="100%"
            width="60%"
            display="flex"
            alignItems="center"
            textAlign="start"
            justifyContent="center"
          >
            <Box>
              <Box mb={3}>
                <Typography>SPRING / SUMMER COLLECTION 2021</Typography>
              </Box>
              <Typography variant="h2" component="h1">
                Get up to 30% Off New Arrivals
              </Typography>
              <Button
                onClick={handleOnShopClick}
                color="primary"
                variant="contained"
                className={classes.btn}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <CategoryCard onClick={handleOnShopClick} />
    </div>
  );
}

export default HomeFeature;
