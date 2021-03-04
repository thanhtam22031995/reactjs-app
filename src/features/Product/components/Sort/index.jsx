import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectField from 'components/FormField/SelectField';

SortProduct.propTypes = {
  onSubmit: PropTypes.func,
  defaultValues: PropTypes.object,
};
SortProduct.defaultProps = {
  onSubmit: null,
  defaultValues: {},
};

const SORT_MAP = [
  { label: 'Giá Cao Tới Thấp', value: { _sort: 'salePrice', _order: 'desc' } },
  { label: 'Giá Tháp Tới Cao', value: { _sort: 'salePrice', _order: 'asc' } },
  { label: 'Mới Nhất', value: { _sort: 'updatedAt', _order: 'desc' } },
  { label: 'Cũ Nhất', value: { _sort: 'updatedAt', _order: 'asc' } },
];

function SortProduct(props) {
  const { defaultValues, onSubmit } = props;
  const schema = yup.object().shape({
    sort: yup.object(),
  });

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: { sort: defaultValues } || { sort: { _sort: 'salePrice', _order: 'desc' } },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (value) => {
    if (onSubmit) onSubmit(value);
  };
  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      <SelectField form={form} name="sort" label="Sắp xếp" options={SORT_MAP} />
    </form>
  );
}

export default SortProduct;
