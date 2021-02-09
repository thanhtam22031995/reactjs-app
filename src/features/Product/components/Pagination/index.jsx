import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';
import React from 'react';

PagePagination.propTypes = {
  pagination: PropTypes.object,
  onChange: PropTypes.func,
};
PagePagination.defaultProps = {
  pagination: {},
  onChange: null,
};
function PagePagination(props) {
  const { _page, pagination, onChange } = props;
  const { _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  const handleChange = (event, value) => {
    if (onChange) onChange(value);
  };

  return (
    <div>
      <Pagination
        size="large"
        page={_page}
        variant="outlined"
        shape="rounded"
        color="primary"
        count={totalPages}
        onChange={handleChange}
      />
    </div>
  );
}

export default PagePagination;
