import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import InputField from 'components/FormField/InputField';
import SelectField from 'components/FormField/SelectField';
import TextareaField from 'components/FormField/TextareaField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
    email: yup
      .string()
      .email('Your Email is invalid, must like example@abc.xyz')
      .required('Please enter your email.'),
    city: yup.string().required('Please select your City/Province.'),
    address: yup.string().required('Please enter your detail address.'),
  });

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: initialValues || {
      name: '',
      email: '',
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

  return (
    <form noValidate autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Box width="100%">
          <InputField name="name" label="Your Name" form={form} />
        </Box>
        <Box width="100%">
          <InputField name="phone" label="Your Phone Number" form={form} type="number" />
        </Box>
        <Box width="100%">
          <InputField name="email" label="Your Email" form={form} type="email" />
        </Box>

        <SelectField
          name="city"
          label="City"
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
