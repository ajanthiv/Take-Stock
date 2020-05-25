import React, { useState , useEffect } from 'react';
import styles from '../styles/StockSummary.module.css';
import {PriceFormat} from '../utilities/helpers';
import StockChart from './StockChart';

const StockSummary = () => {
  const symbol = window.location.hash.slice(1);

  const [stockName, setStockName] = useState('');
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState(null);
  const [stockChanges, setStockChanges] = useState(null);


  useEffect(() => {
    const fetchStockSummary = async() => {
      const url = new URL(`https://financialmodelingprep.com/api/v3/profile/${symbol}`);
      const apiKey = '4f1ab515aa57b12280886be979ccf698';
      url.search = new URLSearchParams({
        apikey: apiKey
      });
  
      try {
        const summary = await fetch(url);
        const summaryData = await summary.json();

        setStockName(summaryData[0].companyName);
        setStockSymbol(summaryData[0].symbol);
        setStockPrice(summaryData[0].price);
        setStockChanges(summaryData[0].changes);

      } catch(err) {
        console.log(err)
      }
    };
    
    fetchStockSummary();
  }, [symbol]);

  const changesClass = stockChanges > 0 ? styles.green : styles.red;

  return (
    <div className={styles.stockSummary}>
      <h1>Stock Summary</h1>
      { stockName && stockPrice
        ? <div>
            <div className={styles.stockInfo}>
              <div className={styles.stockName}>{stockName}</div>
              <div className={styles.stockSymbol}>({stockSymbol})</div>
              <div className={styles.stockPrice}>{PriceFormat(stockPrice)}</div>
              <div className={`${styles.stockChanges} ${changesClass}`}>{stockChanges > 0 ? '+' : ''}{stockChanges}</div>
            </div>
              <StockChart />
          </div>
        : ''}
    </div>
  )
}

export default StockSummary;