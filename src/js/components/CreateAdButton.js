import React from 'react';
import PropTypes from 'prop-types';

const tag = '@CreateAdButton';


const CreateAdButton = ({ handler }) => {
  return <button onClick={ handler } class='ia-create-ad-button' />;
};

CreateAdButton.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default CreateAdButton;
