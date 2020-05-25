import React, { useState , useEffect } from 'react';
import styles from '../styles/StockSummary.module.css';
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";
import { Button, ButtonGroup } from '@material-ui/core';

const StockSummary = () => {
  const symbol = window.location.hash.slice(1);

  const apiKey = 'demo';
  // '117f1a5053dbc179942033ea60b80c58';

  const [data, setChartData] = useState();
  const [dateToday, setDateToday] = useState('');
  const [dateRange, setDateRange] = useState('');

  useEffect(() => {
    setMonth();
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async() => {
      const url = new URL(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`);
      url.search = new URLSearchParams({
        serietype: 'line',
        apikey: apiKey,
        from: dateRange,
        to: dateToday
      });
  
      try {
        const historical = await fetch(url);
        const historicalData = await historical.json();

        setChartData(historicalData.historical.reverse());
      } catch(err) {
        console.log(err)
      }
    };
    
    fetchHistoricalData();
  }, [symbol, dateToday, dateRange]);

  const setMonth = () => {
    const d = new Date();
    const today = d.toISOString().split('T')[0];
    setDateToday(today);
    const lastMonth = new Date(d.setMonth(d.getMonth() - 1)).toISOString().split('T')[0];
    setDateRange(lastMonth);
  }

  const setSixMonth = () => {
    const d = new Date();
    const today = d.toISOString().split('T')[0];
    setDateToday(today);
    const sixMonths = new Date(d.setMonth(d.getMonth() - 6)).toISOString().split('T')[0];
    setDateRange(sixMonths);
  }

  const setOneYear = () => {
    const d = new Date();
    const today = d.toISOString().split('T')[0];
    setDateToday(today);
    const oneYear = new Date(d.setFullYear(d.getFullYear() - 1)).toISOString().split('T')[0];
    setDateRange(oneYear);
  }

  const setThreeYear = () => {
    const d = new Date();
    const today = d.toISOString().split('T')[0];
    setDateToday(today);
    const threeYears = new Date(d.setFullYear(d.getFullYear() - 3)).toISOString().split('T')[0];
    setDateRange(threeYears);
  }

  return (
    <div className={styles.stockChart}>
      <ButtonGroup className={styles.Button} color="primary" aria-label="outlined primary button group">
        <Button onClick={setMonth}>1M</Button>
        <Button onClick={setSixMonth}>6M</Button>
        <Button onClick={setOneYear}>1Y</Button>
        <Button onClick={setThreeYear}>3Y</Button>
      </ButtonGroup>
      <VictoryChart domainPadding={20} padding={50}>
        <VictoryAxis
          fixLabelOverlap
          style={{ tickLabels: { padding: 16, fontSize: 8 } }}
        />
        <VictoryAxis dependentAxis tickFormat={(tick) => `$${tick}`} style={{ tickLabels: { padding: 10, fontSize: 8 } }}/>
        <VictoryLine data={data} x="date" y="close" />
      </VictoryChart>
    </div>
  )
}

export default StockSummary;