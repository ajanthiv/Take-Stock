import React, { useState , useEffect } from 'react';
import styles from '../styles/Search.module.css';
import { OutlinedInput, InputAdornment } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import { Redirect } from "react-router-dom";

const Search = () => { 
  const [stock, setStock] = useState('');
  const [queryStock, setQueryStock] = useState('');
  const [searchResults, setSearchResults] = useState('');


  useEffect(() => {
    const fetchSearch= async() => {
      const url = new URL('https://financialmodelingprep.com/api/v3/search');
      const apiKey = '4f1ab515aa57b12280886be979ccf698';

      url.search = new URLSearchParams({
        apikey: apiKey,
        query: queryStock,
        limit: 10
      });
  
      try {
        const result = await fetch(url);
        const resultData = await result.json();
  
        setSearchResults(resultData);
      } catch(err) {
        console.log(err)
      }
    };

    if(queryStock) fetchSearch();

  }, [queryStock]);

  const handleChange = (e) => {
    setStock(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueryStock(stock);
  }

  return(
    <>
      <form noValidate autoComplete="off" className={styles.searchBar} onSubmit={handleSubmit}>
          <OutlinedInput
            id="input-with-icon-adornment"
            onChange={handleChange}
            placeholder="Search" variant="outlined"
            endAdornment={<InputAdornment position="end"><button type="submit"><SearchRounded /></button></InputAdornment>}
          />
      </form>
      {searchResults.length > 0 && 
        <Redirect to={{
            pathname: '/search',
            state: { query: queryStock, results: searchResults }
        }}/>
      }
    </>
  )
}


export default Search;