import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

SelectFieldChange.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
};

SelectFieldChange.defaultProps = {
  label: '',
  disabled: false,
};

function SelectFieldChange(props) {
  const { name, label, form, disabled, options, onChange } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;

  const handleOnChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <Box mt={1} mb={2}>
      <FormControl variant="outlined" error={hasError}>
        <InputLabel id={name}>{label}</InputLabel>

        <Controller
          name={name}
          control={form.control}
          defaultValue="updatedAt"
          render={({ value, onChange, onBlur }) => (
            <Select
              defaultValue="updatedAt"
              style={{ width: '150px' }}
              disabled={disabled}
              labelId={name}
              value={value}
              onChange={(event) => {
                onChange(event.target.value);
                handleOnChange(event);
              }}
              label={label}
              onBlur={onBlur}
            >
              {options.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default SelectFieldChange;
