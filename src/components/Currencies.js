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
    const fetchCurrencies = async() => {
      const url = new URL('http://api.currencylayer.com/live');
      url.search = new URLSearchParams({
        access_key: apiKey,
        currencies: 'CAD,AUD,GBP,CNY,JPY,INR,LKR'
      });
  
      try {
        const response = await fetch(url);
        const resposeData = await response.json();
        setCurrencies(resposeData.quotes);
        console.log('respose', currencies)
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
        currencies.length
        ? <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Pair</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currencies.map((currency, index) => {
                  console.log('ccy', currency);
                  <TableRow>
                    <TableCell>{currency[0]}</TableCell>
                    <TableCell>{currency[1]}</TableCell>
                  </TableRow>
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