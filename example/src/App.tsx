import React from 'react'

import { useFetch } from 'react-use-fetch-hook'
import './App.css';

const  fetchQuote  =  (forceError?: string) => fetch('https://api.quotable.io/random')
  .then((response) => {
    if (forceError || !response.ok) {
      return Promise.reject(forceError || response.statusText);
    }
    return response;
  })
  .then(response => response.json())
  .then(data => data);

const App = () => {
  const  { data, isLoading, error, refetch } = useFetch(fetchQuote);

  return (
    <div className="App-wrapper box">
      <div className="App-message">
        {isLoading ? 'Loading...' : (
          error || (data && data.content)
        )}
      </div>
      <div className="App-actions-wrapper">
        <button className="btn btn-primary" onClick={() => refetch()}>Get new quote</button>
        <button className="btn btn-secondary" onClick={() => refetch('Manually generated error')}>Fetch with error</button>
      </div>
    </div>
  )
};

export default App
