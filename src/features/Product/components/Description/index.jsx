import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
DetailDescription.propTypes = {
  product: PropTypes.object,
};
DetailDescription.defaultProps = {
  product: {},
};

function DetailDescription({ product }) {
  return <div dangerouslySetInnerHTML={{ __html: product.description }}></div>;
}

export default DetailDescription;
