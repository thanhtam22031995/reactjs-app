import { Box, Button, makeStyles } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PropTypes from 'prop-types';
import React from 'react';

Filters.propTypes = {
  onClick: PropTypes.func.isRequired,
  categories: PropTypes.string,
};
Filters.defaultProps = {
  categories: '',
};
const useStyle = makeStyles({
  root: {
    justifyContent: 'flex-start',
  },
});

const CATEGORIES_MAP = [
  { name: 'Áo Sơ Mi Nữ', value: 'c45eca94-70ef-4264-8714-df482e3d0eff' },
  { name: 'Khẩu Trang', value: '3ab235d3-7b26-49ad-a5c1-0d4b2f91056e' },
  { name: 'Làm Đẹp', value: '641710c1-5db5-4651-8fad-58ae8f7c7a34' },
  { name: 'Macbook', value: '7922f29f-32eb-4e88-bde8-c283a26da4ba' },
  { name: 'Ổ Cứng', value: 'ea0cfab5-ecac-48fc-a84a-16e869c37620' },
  { name: 'IPHONE', value: 'b4fce5af-d6d5-4438-876d-a7d436087097' },
];

function Filters(props) {
  const { categories, onClick } = props;
  const classes = useStyle();

  return (
    <Box
      mt={1}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="flex-start"
    >
      {CATEGORIES_MAP.map((category) => (
        <Box
          width="160px"
          display="flex"
          justifyContent="flex-start"
          mt={0.25}
          key={category.value}
        >
          <Button
            className={classes.root}
            fullWidth
            startIcon={<ArrowRightIcon />}
            variant={categories === category.value ? 'contained' : 'outlined'}
            color={categories === category.value ? 'primary' : 'default'}
            onClick={() => onClick(category)}
          >
            {category.name}
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export default Filters;
