import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DateSelect = ({ onDateChange }) => {
  return (
    <input type="date" className="form-control w-25 mr-3" onChange={onDateChange} />
  );
};

export default DateSelect;
