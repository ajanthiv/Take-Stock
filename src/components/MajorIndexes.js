import React, { useState, useEffect } from 'react';
import IndexCard from './IndexCard';
import styles from '../styles/MajorIndexes.module.css';

const MajorIndexes = () => { 
  const apiKey = 'demo';
  // '117f1a5053dbc179942033ea60b80c58';
  const [majorIndex, setMajorIndex] = useState('');

  useEffect(() => {
    const fetchMajorIndexes = async() => {
      const url = new URL('https://financialmodelingprep.com/api/v3/search');
      // https://financialmodelingprep.com/api/v3/majors-indexes
      url.search = new URLSearchParams({
        apikey: apiKey,
        query: 'VFV',
        limit: 10
      });
  
      try {
        const response = await fetch(url);
        const majorIndexesData = await response.json();
        setMajorIndex(majorIndexesData);
        // majorIndexesData.majorIndexesList
      } catch(err) {
        console.log(err)
      }
    };
    
    fetchMajorIndexes();
  }, []);

  return(
    <div className={styles.majorIndexes}>
      <h2>Major Indexes</h2>
      <div className={styles.majorIndexesList}>
        {
          majorIndex.length ? majorIndex.map((marketIndex, index) => <IndexCard indexCard={marketIndex} key={`majorIndex-${index}`} />)
          : ''
        }
      </div>
    </div>
  )
}


export default MajorIndexes;