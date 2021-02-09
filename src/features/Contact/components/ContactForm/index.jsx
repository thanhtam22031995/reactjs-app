import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/FormField/InputField';
import SelectField from '../../../../components/FormField/SelectField';
import TextareaField from '../../../../components/FormField/TextareaField';

ContactForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
ContactForm.defaultProps = {
  initialValues: null,
};

function ContactForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    name: yup.string().required('Please enter your name.'),
    phone: yup.number().required('Please enter your phone number.'),
    city: yup.string().required('Please select your City/Province.'),
    address: yup.string().required('Please enter your detail address.'),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      phone: '',
      city: '',
      address: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  // const { setValue } = form;

  // useEffect(() => {
  //   setValue('name', initialValues ? initialValues.name : '');
  //   setValue('shortDescription', initialValues?.shortDescription || '');
  //   setValue('originalPrice', initialValues?.originalPrice || '');
  //   setValue('isPromotion', initialValues?.isPromotion || 0);
  //   setValue('promotionPercent', initialValues?.promotionPercent || '');
  //   setValue('images', initialValues?.images || []);
  //   setValue('categoryId', initialValues?.categoryId || '');
  //   setValue('isFreeShip', initialValues?.isFreeShip || false);
  // }, [initialValues, setValue]);
  return (
    <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h3">Contact Form</Typography>
        <Box width="100%">
          <InputField name="name" label="Your Name" form={form} />
        </Box>
        <Box width="100%">
          <InputField name="phone" label="Your Phone Number" form={form} />
        </Box>
        <SelectField
          name="categoryId"
          label="Product Category"
          options={[
            { label: 'Tp.HCM', value: 'hcm' },
            { label: 'Hà Nội', value: 'hn' },
            { label: 'Thừa Thiên Huế', value: 'tth' },
            { label: 'Đà Nẵng', value: 'dn' },
            { label: 'Nha Trang', value: 'nt' },
            { label: 'Đà Lạt', value: 'dl' },
          ]}
          form={form}
        />
        <Box width="100%">
          <TextareaField name="address" label="Detail Address" form={form} />
        </Box>

        <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default ContactForm;
