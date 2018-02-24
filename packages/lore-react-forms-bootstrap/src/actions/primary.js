import React from 'react';

export default function(form, props) {
  const {
    label,
    ...other
  } = props;

  return (
    <button
      type="button"
      className="btn btn-primary"
      {...other}
    >
      {label}
    </button>
  );
}
