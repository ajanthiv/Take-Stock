import React from 'react';
import ResultCard from './ResultCard';
import styles from '../styles/Search.module.css';
import {
  TableContainer,
  Table, 
  TableHead,
  TableRow,
  TableCell,
  TableBody, 
  Paper
} from '@material-ui/core';

const Search = (props) => { 
  const {query, results} = props.location.state;

  return(
    <div className={styles.searchResults}>
      <h1>Search Results: {query}</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Exchange</TableCell>
              <TableCell align="right">Currency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((stock, index) => <ResultCard result={stock} key={`resultStock-${index}`} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default Search;