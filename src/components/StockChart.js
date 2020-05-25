import React, { useState , useEffect } from 'react';
import styles from '../styles/StockSummary.module.css';
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";
import { Button, ButtonGroup } from '@material-ui/core';

const StockSummary = () => {
  const symbol = window.location.hash.slice(1);

  const d = new Date();
  const today = d.toISOString().split('T')[0];
  const lastMonth = new Date(d.setMonth(d.getMonth() - 1)).toISOString().split('T')[0];

  const apiKey = 'demo';
  // '117f1a5053dbc179942033ea60b80c58';

  const [data, setChartData] = useState();


  useEffect(() => {
    const fetchHistoricalData = async() => {
      const url = new URL(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`);
      url.search = new URLSearchParams({
        serietype: 'line',
        apikey: apiKey,
        from: lastMonth,
        to: today
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
  }, []);


  return (
    <div className={styles.stockChart}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>1M</Button>
        <Button>6M</Button>
        <Button>1Y</Button>
        <Button>3Y</Button>
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