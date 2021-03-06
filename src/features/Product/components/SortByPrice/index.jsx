import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import SliderField from 'components/FormField/SliderFiled';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

SortByPrice.propTypes = {
  onSubmit: PropTypes.func,
  defaultValues: PropTypes.array,
};
SortByPrice.defaultProps = {
  onSubmit: null,
  defaultValues: [0, 2000000],
};
const useStyle = makeStyles({
  btn: {
    color: '#f5f6fa',
    backgroundColor: '#2f3640',
    '&:hover': {
      backgroundColor: '#353b48',
    },
  },
});

function SortByPrice(props) {
  const classes = useStyle();

  const { defaultValues, onSubmit } = props;
  const schema = yup.object().shape({
    sortPrice: yup.array(),
  });

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: defaultValues || [0, 2000000],
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (value) => {
    if (onSubmit) onSubmit(value);
  };
  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      <SliderField
        defaultProps={[0, 2000000]}
        form={form}
        name="sortPrice"
        label="Filter By Price"
      />
      <Button className={classes.btn} fullWidth type="submit">
        Filter
      </Button>
    </form>
  );
}

export default SortByPrice;
