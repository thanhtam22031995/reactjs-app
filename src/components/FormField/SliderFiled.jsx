import { Box, makeStyles, Slider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

SliderField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
};

SliderField.defaultProps = {
  label: '',
};
const useStyle = makeStyles({
  price: {
    fontSize: 13,
  },
});

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫';
}

function SliderField(props) {
  const { name, label, form, defaultProps } = props;
  const [value, setValue] = useState([0, 2000000]);
  const classes = useStyle();
  return (
    <Box ml={2} mt={1} mb={2} textAlign="start">
      <Typography>{label}</Typography>
      <Box mt={2} display="flex">
        <Typography className={classes.price}>{currencyFormat(value[0])}</Typography>
        <Typography className={classes.price}>-</Typography>
        <Typography className={classes.price}>
          {value[1] < 10000000 ? currencyFormat(value[1]) : `${currencyFormat(value[1])}+`}
        </Typography>
      </Box>
      <Controller
        name={name}
        control={form.control}
        defaultValue={defaultProps}
        render={({ value, onChange, onBlur }) => (
          <Slider
            min={0}
            max={10000000}
            step={5000}
            defaultValue={[0, 2000000]}
            onBlur={onBlur}
            value={value}
            onChange={(_, value) => {
              onChange(value);
              setValue(value);
            }}
            style={{ color: '#fe4c50' }}
          />
        )}
      />
    </Box>
  );
}

export default SliderField;
