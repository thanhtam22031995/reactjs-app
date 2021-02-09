import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CheckboxField from '../../../../components/FormField/CheckboxField';
import InputField from '../../../../components/FormField/InputField';
import OptionField from '../../../../components/FormField/OptionField';
import PhotoListField from '../../../../components/FormField/PhotoListField';
import SelectField from '../../../../components/FormField/SelectField';
import TextareaField from '../../../../components/FormField/TextareaField';

AddEditForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
AddEditForm.defaultProps = {
  initialValues: null,
};

function AddEditForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    name: yup.string().required("Please enter product's name."),
    shortDescription: yup.string().required("Please enter product's Description."),
    originalPrice: yup
      .number("Please enter product's Price is number.")
      .required("Please enter product's Price."),
    isPromotion: yup.number(),
    promotionPercent: yup
      .number()
      .when(['isPromotion'], {
        is: (isPromotion) => isPromotion === 0,
        then: yup.number().max(0).min(0),
      })
      .when(['isPromotion'], {
        is: (isPromotion) => isPromotion === 1,
        then: yup.number().min(0).max(80),
      }),
    images: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Please enter contact name.'),
      })
    ),
    categoryId: yup.string().required("Please select product's category."),
    isFreeShip: yup.boolean(),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      shortDescription: '',
      originalPrice: 0,
      isPromotion: 0,
      promotionPercent: 0,
      images: [],
      categoryId: '',
      isFreeShip: false,
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  const { setValue } = form;

  useEffect(() => {
    setValue('name', initialValues ? initialValues.name : '');
    setValue('shortDescription', initialValues?.shortDescription || '');
    setValue('originalPrice', initialValues?.originalPrice || '');
    setValue('isPromotion', initialValues?.isPromotion || 0);
    setValue('promotionPercent', initialValues?.promotionPercent || '');
    setValue('images', initialValues?.images || []);
    setValue('categoryId', initialValues?.categoryId || '');
    setValue('isFreeShip', initialValues?.isFreeShip || false);
  }, [initialValues, setValue]);
  return (
    <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h3">Product Form</Typography>
        <Box width="100%">
          <InputField name="name" label="Product Name" form={form} />
        </Box>
        <Box width="100%">
          <TextareaField name="shortDescription" label="Product Description" form={form} />
        </Box>
        <InputField name="originalPrice" label="Product Original Price" form={form} type="number" />
        <CheckboxField name="isFreeShip" label="Free Ship" form={form} />
        <OptionField
          options={[
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' },
          ]}
          name="isPromotion"
          label="Promotion"
          form={form}
        />
        <InputField name="promotionPercent" label="Discount percent" form={form} type="number" />
        <SelectField
          name="categoryId"
          label="Product Category"
          options={[
            { label: 'Áo Sơ Mi Nữ', value: 'c45eca94-70ef-4264-8714-df482e3d0eff' },
            { label: 'Khẩu Trang', value: '3ab235d3-7b26-49ad-a5c1-0d4b2f91056e' },
            { label: 'Làm Đẹp', value: '641710c1-5db5-4651-8fad-58ae8f7c7a34' },
            { label: 'Macbook', value: '7922f29f-32eb-4e88-bde8-c283a26da4ba' },
            { label: 'Ổ Cứng', value: 'ea0cfab5-ecac-48fc-a84a-16e869c37620' },
            { label: 'IPHONE', value: 'b4fce5af-d6d5-4438-876d-a7d436087097' },
          ]}
          form={form}
        />
        <PhotoListField name="images" label="Product Images" form={form} />

        <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default AddEditForm;
