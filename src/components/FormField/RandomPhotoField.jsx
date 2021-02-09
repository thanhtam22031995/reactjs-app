import { Box, FormLabel, IconButton } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

RandomPhotoField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

RandomPhotoField.defaultProps = {
  label: '',
  disabled: false,
};

function RandomPhotoField(props) {
  const { name, label, form, defaultValue } = props;

  const handleRandomClick = (onChange) => {
    const randomNumber = Math.trunc(Math.random() * 1000);

    const newValue = `https://picsum.photos/id/${randomNumber}/400/200`;

    onChange(newValue);
  };

  const handleRandomClickV2 = () => {
    const randomNumber = Math.trunc(Math.random() * 1000);

    const newValue = `https://picsum.photos/id/${randomNumber}/390/390`;

    form.setValue(name, newValue, { shouldValidate: true });
  };

  return (
    <Box mt={1} mb={2}>
      <FormLabel>{label}</FormLabel>

      <Controller
        name={name}
        control={form.control}
        defaultValue={defaultValue}
        render={({ value, onChange }) => (
          <Box position="relative" width="390px" heigh="390px">
            <Box
              component="img"
              src={value || 'https://via.placeholder.com/390x390.png'}
              onError={() => handleRandomClick(onChange)}
              width="100%"
            />
            <Box position="absolute" top="0" right="0">
              <IconButton color="secondary" type="button" onClick={handleRandomClickV2}>
                <AutorenewIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
}

export default RandomPhotoField;
