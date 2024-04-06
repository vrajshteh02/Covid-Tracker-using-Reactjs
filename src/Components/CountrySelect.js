import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CountrySelect = ({ countries, onCountryChange, selectedCountry }) => {
  return (
    <select className="form-control w-25 mr-3" value={selectedCountry} onChange={onCountryChange}>
      <option value="">Select a Country</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
