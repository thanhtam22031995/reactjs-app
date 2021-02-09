import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import RandomPhotoField from './RandomPhotoField';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

PhotoListField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

PhotoListField.defaultProps = {
  label: '',
  disabled: false,
};

function PhotoListField(props) {
  const { name, label, form } = props;
  const { fields, append, remove } = useFieldArray({
    name,
    control: form.control,
  });

  const handleAddClick = () => {
    append({
      name: '',
    });
  };

  return (
    <Box mt={1} mb={2}>
      <Grid container justify="space-evenly">
        {fields.map((field, idx) => (
          <Grid key={field.id} item>
            <Box position="relative" padding={1}>
              <Typography>
                {label} {idx + 1}
              </Typography>

              <RandomPhotoField
                name={`${name}[${idx}].name`}
                label="Image"
                defaultValue={field.name}
                form={form}
              />
              <Box position="absolute" top="100px" right="8px">
                <IconButton
                  variant="contained"
                  style={{ color: '#3498db' }}
                  onClick={() => remove(idx)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Button fullWidth variant="outlined" color="primary" onClick={handleAddClick}>
        Add new Image
      </Button>
    </Box>
  );
}

export default PhotoListField;
