import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CovidStats = ({ stats }) => {
  if (!stats.country || stats.country === 'Error') {
    return <p className="text-center">Error fetching data. Please try again.</p>;
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Statistics for {stats.country}</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Active Cases</div>
            <div className="card-body fs-4">{stats.cases.active}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Total Cases</div>
            <div className="card-body fs-4">{stats.cases.total}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Deaths</div>
            <div className="card-body fs-4">{stats.deaths.total}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-secondary mb-3">
            <div className="card-header">Recovered</div>
            <div className="card-body fs-4">{stats.cases.recovered}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovidStats;
