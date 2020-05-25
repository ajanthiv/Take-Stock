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
  const [currencies, setCurrencies] = useState('');

  useEffect(() => {
    const fetchCurrencies = async() => {
      const apiKey = '1514441fff1dafc6155aa57c';
      const url = new URL(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);

      // url.search = new URLSearchParams({
      //   access_key: apiKey,
      //   currencies: 'CAD,AUD,GBP,CNY,JPY,INR,LKR'
      // });
  
      try {
        const response = await fetch(url);
        const resposeData = await response.json();
        setCurrencies(resposeData.conversion_rates);
      } catch(err) {
        console.log(err)
      }
    };
    
    fetchCurrencies();
  }, []);

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
                  return(
                    <TableRow key={`currency-${index}`}>
                      <TableCell>{`USD/${currency[0]}`}</TableCell>
                      <TableCell>{currency[1]}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        : <div>Currencies Unvailable</div>
      }
    </div>
  )
}


export default Currencies;