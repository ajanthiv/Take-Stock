import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { enableFetchMocks } from "jest-fetch-mock";
import MajorIndexes from "./components/MajorIndexes";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import StockSummary from "./components/StockSummary";


describe('Testing Major Indexes component', () => {
  test("Major Indexes component is being rendered", () => {
    render(<MajorIndexes />);
  });

  // test("Mock major index API call", async () => {
  //   enableFetchMocks();
  //   fetch.mockResponseOnce(
  //     JSON.stringify({
  //       "ticker" : ".DJI",
  //       "changes" : 65.2793,
  //       "price" : 26491.7,
  //       "indexName" : "Dow Jones"
  //     })
  //   );

  //   await wait(() => {
  //     expect(fetch).toHaveBeenCalledTimes(0);
  //     expect(queryByText("Dow Jones")).toBeInTheDocument();
  //   });
  // })
});

describe('Testing search bar functionality', () => {
  test("Search bar can be rendered", () => {
    render(<SearchBar />);
  });

  // test("Clicking submit without text won't search", () => {
  //   const searchBar = render(<SearchBar />);
  //   const submit = searchBar.find('button')
  //   fireEvent.click(submit);

  //   const majorIndex = queryByText("Major Indexes");
  //   expect(majorIndex).not.toBeNull();
  // });
});

describe('Testing search results functionality', () => {
  test("Search results can be rendered", () => {
    const results = {
      "symbol" : "AAPL",
      "name" : "Apple Inc.",
      "currency" : "USD",
      "stockExchange" : "NasdaqGS",
      "exchangeShortName" : "NASDAQ"
    };

    render(<SearchResults state={{query: 'aap', results: results}}/>);
  });

  // test("Clicking a search result will go to the summary page", () => {
  //   const results = {
  //     "symbol" : "AAPL",
  //     "name" : "Apple Inc.",
  //     "currency" : "USD",
  //     "stockExchange" : "NasdaqGS",
  //     "exchangeShortName" : "NASDAQ"
  //   };

  //   const {queryByText, getByText} = render(<SearchResults state={{query: 'aap', results: results}}/>);
  //   const searchResult = getByText("Apple Inc.");
  //   fireEvent.click(searchResult);

  //   const stockSummary = queryByText("Stock Summary");
  //   expect(stockSummary).not.toBeNull();
  // });
});

describe('Testing summary functionality', () => {
  test("Stock summary can be rendered", () => {
    render(<StockSummary />);
  });

  // test("Clicking date button updates chart", () => {
  //   const { getAllByText } = render(<StockSummary />);

  //   const dateButton = getAllByText("6M");
  //   fireEvent.click(dateButton);

  //   const date = queryByText(/2019/);
  //   expect(date).not().toBeNull();

  // });
});