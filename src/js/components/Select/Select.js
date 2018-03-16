import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({ id, currentValue, items, name, onChange, ...rest }) => (
  <select
    name={name}
    id={id}
    value={currentValue}
    onChange={onChange}
    {...rest}
    >
    { items.map(({ label, value }) => (
      <option key={value} value={value}>
        { label }
      </option>
    )) }
  </select>
);

Select.propTypes = {
  items: PropTypes.array.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  id: 'select',
  name: 'select'
};
