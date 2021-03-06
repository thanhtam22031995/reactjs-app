import { yupResolver } from '@hookform/resolvers/yup';
import SelectFieldChange from 'components/FormField/SelectFieldChange';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

SortProduct.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};
SortProduct.defaultProps = {
  onSubmit: null,
  initialValues: {},
};

const SORT_MAP = [
  { label: 'Time', value: 'updatedAt' },
  { label: 'Price', value: 'salePrice' },
  { label: 'Product Name', value: 'name' },
];

function SortProduct(props) {
  const { initialValues, onSubmit } = props;
  const schema = yup.object().shape({
    sort: yup.string(),
  });

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues || { sort: '' },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (value) => {
    if (onSubmit) onSubmit(value);
  };
  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      <SelectFieldChange
        onChange={handleOnSubmit}
        form={form}
        name="sort"
        label="Sorting"
        options={SORT_MAP}
      />
    </form>
  );
}

export default SortProduct;
