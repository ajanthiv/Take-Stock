import React, { useState, useEffect } from 'react';
import styles from '../styles/Currencies.module.css';
import {
  TableContainer,
  Table, 
  TableHead,
  TableRow,
  TableCell,
  TableBody, 
  Paper
} from '@material-ui/core';


const Currencies = () => { 
  const apiKey = '65a2648aac181c16f87fda39c239464f';
  const [currencies, setCurrencies] = useState('');

  useEffect(() => {
    const data = {
      "success": true,
      "terms": "https://currencylayer.com/terms",
      "privacy": "https://currencylayer.com/privacy",
      "timestamp": 1590338106,
      "source": "USD",
      "quotes": {
      "USDUSD": 1,
      "USDAUD": 1.529988,
      "USDCAD": 1.39945,
      "USDPLN": 4.14095,
      "USDMXN": 22.730404
      }
    }
  setCurrencies(data.quotes);
  console.log('currency', currencies)
  }, [])

  // useEffect(() => {
  //   const fetchCurrencies = async() => {
  //     const url = new URL('http://api.currencylayer.com/live');
  //     url.search = new URLSearchParams({
  //       access_key: apiKey,
  //       currencies: 'CAD,AUD,GBP,CNY,JPY,INR,LKR'
  //     });
  
  //     try {
  //       const response = await fetch(url);
  //       const resposeData = await response.json();
  //       setCurrencies(resposeData.quotes);
  //       console.log('respose', currencies)
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   };
    
  //   fetchCurrencies();
  // }, []);

  return(
    <div className={styles.currencies}>
      <h2>Currencies</h2>
      {
        currencies
        ? <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Pair</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { Object.entries(currencies).map((currency, index) => {
                  const countries = currency[0].match(/.{1,3}/g);
                  return(
                    <TableRow key={`currency-${index}`}>
                      <TableCell>{`${countries[0]}/${countries[1]}`}</TableCell>
                      <TableCell>{currency[1]}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        : ''
      }
    </div>
  )
}


export default Currencies;