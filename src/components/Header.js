import React from 'react';
import styles from '../styles/Header.module.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";

import Home from './Home';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import StockSummary from './StockSummary';
import { ShowChartRounded } from '@material-ui/icons';

const Header = () => {
  return (
    <Router>
      <div className={styles.header}>
        <NavLink exact to="/" className={styles.logo}>
          Take Stock <ShowChartRounded color="primary" style={{ fontSize: 50 }} />
        </NavLink>
        {/* <NavLink exact to="/search">SearchBar</NavLink> */}
        <SearchBar />
      </div>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={SearchResults} />
      <Route path="/summary" component={StockSummary} />
    </Router>
  )
}

export default Header;

