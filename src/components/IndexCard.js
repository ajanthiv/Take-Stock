import React from 'react';
import {PriceFormat} from '../utilities/helpers';
import styles from '../styles/IndexCard.module.css';

const IndexCard = (props) => {
  const {name} = props.indexCard;
  // , price, change
  const price = 26491.7;
  const change = 65.2793;

  return (
    <div className={styles.indexCard}>
      <div className={styles.indexName}>{name}</div>
      <div className={styles.indexPrice}>{PriceFormat(price)}</div>
      <div className={`${styles.indexChange} ${change > 0 ? styles.green : styles.red}`}>{change > 0 ? '+' : ''}{change}</div> 
    </div>
  )
}

export default IndexCard;