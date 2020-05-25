import React from 'react';
import {PriceFormat} from '../utilities/helpers';
import styles from '../styles/MajorIndexes.module.css';

const IndexCard = (props) => {
  const {indexName, price, changes} = props.indexCard;

  return (
    <div className={styles.indexCard}>
      <div className={styles.indexName}>{indexName}</div>
      <div className={styles.indexPrice}>{PriceFormat(price)}</div>
      <div className={`${styles.indexChange} ${changes > 0 ? styles.green : styles.red}`}>{changes > 0 ? '+' : ''}{changes}</div> 
    </div>
  )
}

export default IndexCard;