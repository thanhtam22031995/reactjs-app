import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

ImageSelector.propTypes = {
  imageList: PropTypes.array,
};
ImageSelector.defaultProps = {
  imageList: [],
};

const useStyle = makeStyles({
  image: {
    maxWidth: '100%',
    cursor: 'pointer',
    width: '100px',
    height: '100px',

    '&:hover': {
      border: '1px solid #e74c3c',
    },
  },
  image2: {
    maxWidth: '100%',
    height: '55vh',
  },
  imagebox: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

function ImageSelector({ imageList }) {
  const classes = useStyle();
  const [selectedImage, setSelectedImage] = useState(imageList[0] || '');

  useEffect(() => {
    setSelectedImage(imageList[0]);
  }, [imageList]);

  return (
    <Box borderRadius="5px" padding="10px" width="100%">
      <Grid container>
        <Grid item md={2}>
          <Box mb={2} overflow="auto" className={classes.imagebox} height="55vh" width="100%">
            {imageList.map((image) => (
              <Box paddingTop={0.7} mt={1} key={image} borderRadius="3px">
                <img
                  border={selectedImage === image ? '1px solid #e74c3c' : 'none'}
                  className={classes.image}
                  onClick={() => setSelectedImage(image)}
                  src={image}
                  alt=""
                />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <Box width="100%" position="relative" padding="12px">
            <img
              className={classes.image2}
              onClick={() => console.log('onClick')}
              src={selectedImage}
              alt=""
            />

            <Box position="absolute" left="0" top="45%">
              <IconButton
                onClick={() =>
                  setSelectedImage(imageList[imageList.findIndex((x) => x === selectedImage) - 1])
                }
                disabled={imageList.findIndex((x) => x === selectedImage) === 0}
              >
                <ArrowBackIosIcon />
              </IconButton>
            </Box>

            <Box position="absolute" right="0" top="45%">
              <IconButton
                onClick={() =>
                  setSelectedImage(imageList[imageList.findIndex((x) => x === selectedImage) + 1])
                }
                disabled={imageList.findIndex((x) => x === selectedImage) >= imageList.length - 1}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ImageSelector;
