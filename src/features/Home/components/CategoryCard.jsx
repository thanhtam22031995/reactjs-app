import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

CategoryCard.propTypes = {
  onClick: PropTypes.func,
};
CategoryCard.defaultProps = {
  onClick: null,
};

const CATEGORIES_MAP = [
  {
    name: 'Áo Sơ Mi Nữ',
    value: 'c45eca94-70ef-4264-8714-df482e3d0eff',
    image: 'url(./images/AoSomi.jpg)',
  },
  {
    name: 'Khẩu Trang',
    value: '3ab235d3-7b26-49ad-a5c1-0d4b2f91056e',
    image: 'url(./images/mask.jpg)',
  },
  {
    name: 'Làm Đẹp',
    value: '641710c1-5db5-4651-8fad-58ae8f7c7a34',
    image: 'url(./images/lamdep.jpg)',
  },
  {
    name: 'Macbook',
    value: '7922f29f-32eb-4e88-bde8-c283a26da4ba',
    image: 'url(./images/Macbook.jpg)',
  },
  {
    name: 'Ổ Cứng',
    value: 'ea0cfab5-ecac-48fc-a84a-16e869c37620',
    image: 'url(./images/ocung.jpg)',
  },
  {
    name: 'IPhone',
    value: 'b4fce5af-d6d5-4438-876d-a7d436087097',
    image: 'url(./images/iphone.jpg)',
  },
];

const useStyle = makeStyles({
  list: {
    display: 'flex',
    padding: 20,
    overflowX: 'scroll',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 300,
    flexShrink: 0,
    backgroundSize: 'cover',
    margin: 10,
    marginBottom: -10,
  },
  title: {
    height: 50,
    width: 200,
    fontSize: 24,

    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontWeight: 'bolder',

    transition: 'all 0.45s',
    '&:hover': {
      color: '#95a5a6',
    },
    '&::selection': {
      color: '#FF6347',
      backgroundColor: '#fde0db',
    },
  },
});

function CategoryCard({ onClick }) {
  const classes = useStyle();
  const handleOnClick = () => {
    if (onClick) onClick();
  };
  return (
    <Container>
      <Box className={classes.list}>
        {CATEGORIES_MAP.map((item) => (
          <Box className={classes.item} key={item.value} style={{ backgroundImage: item.image }}>
            <Box style={{ cursor: 'pointer' }} onClick={handleOnClick}>
              <Typography className={classes.title}>{item.name}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default CategoryCard;
