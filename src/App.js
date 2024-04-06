import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountrySelect from './Components/CountrySelect';
import DateSelect from './Components/DateSelect';
import CovidStats from './Components/CovidStats';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = 'a60b73c228mshe2db7713b372d48p149fc5jsnefbbfc3f62cc';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [selectedDate, setSelectedDate] = useState('');
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://covid-193.p.rapidapi.com/countries', {
          headers: {
            'X-RapidAPI-Key': API_KEY,
          },
        });
        setCountries(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setNoData(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setNoData(false);
  };

  const fetchStats = async () => {
    if (!selectedCountry || !selectedDate) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setNoData(false);

    try {
      const response = await axios.get('https://covid-193.p.rapidapi.com/history', {
        params: {
          country: selectedCountry,
          day: selectedDate,
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
        },
      });

      if (response.data.response.length === 0) {
        setNoData(true);
      } else {
        setStats(response.data.response[0]);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [selectedCountry, selectedDate]);

  return (
    <div className="container mt-3">
      <h1>COVID-19 Statistics</h1>
      <div className="d-flex mb-3 gap-3">
        <CountrySelect countries={countries} onCountryChange={handleCountryChange} selectedCountry={selectedCountry} />
        <DateSelect onDateChange={handleDateChange} />
        <button type="button" className="btn btn-primary ml-3" onClick={fetchStats} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get Stats'}
        </button>
      </div>
      {error && <div className="alert alert-danger">Error fetching stats: {error.message}</div>}
      {isLoading ? (
        <div className="text-center">Loading statistics...</div>
      ) : noData ? (
        <div className="alert alert-info">No data available for this country and date.</div>
      ) : (
        Object.keys(stats).length > 0 && <CovidStats stats={stats} />
      )}
    </div>
  );
};

export default App;
