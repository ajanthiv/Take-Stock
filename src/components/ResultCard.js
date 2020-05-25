import React from 'react';
import {
  TableRow,
  TableCell
} from '@material-ui/core';
import { Link } from "react-router-dom";

const ResultCard = (props) => {
  const {symbol, name, exchangeShortName, currency} = props.result;

  return (
    <>
      <TableRow>
        <TableCell><Link to={`/summary/#${symbol}`}>{name}</Link></TableCell>
        <TableCell align="right">{exchangeShortName}</TableCell>
        <TableCell align="right">{currency}</TableCell>
      </TableRow>
    </>
  )
}

export default ResultCard;