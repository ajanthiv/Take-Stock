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
      const url = new URL('http://api.currencylayer.com/live');
      const apiKey = '65a2648aac181c16f87fda39c239464f';

      url.search = new URLSearchParams({
        access_key: apiKey,
        currencies: 'CAD,AUD,GBP,CNY,JPY,INR,LKR'
      });
  
      try {
        const response = await fetch(url);
        const resposeData = await response.json();
        setCurrencies(resposeData.quotes);
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
        : <div>Currencies Unvailable</div>
      }
    </div>
  )
}


export default Currencies;