/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useRef, useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Header from './Header';
import SearchFilter from './SearchFilter';
import GamesList from './GamesList';

// const API = 'http://starlord.hackerearth.com/gamesext';
const API = '/api/gamesext.json';

function SapientGames() {
  const virtualizeRef = useRef();
  const [list, setList] = useState();
  const [allList, setallList] = useState([]);
  const [scoreOrder, setScoreOrder] = useState('asc');
  const [releaseOrder, setReleaseOrder] = useState('asc');
  const [itemHeight, setItemHeight] = useState(120);
  useEffect(() => {
    if (window.innerWidth < 420) {
      setItemHeight(120);
    } else {
      setItemHeight(120);
    }
    fetch(API)
      .then(response => response.json())
      .then(data => {
        setList(data);
        setallList(data);
      });
  }, []);

  const filterByValue = (array, string) => {
    return array.filter(obj =>
      Object.keys(obj).some(key =>
        obj[key]
          .toString()
          .toLowerCase()
          .includes(string.toLowerCase()),
      ),
    );
  };

  const handleSearch = event => {
    virtualizeRef && virtualizeRef.current.scrollTo(0, 0);
    setList(filterByValue(allList, event.target.value));
  };
  const handleSortScore = () => {
    virtualizeRef && virtualizeRef.current.scrollTo(0, 0);
    const sortAsc = (a, b) => parseInt(a.score, 10) - parseInt(b.score, 10);
    const sortDesc = (a, b) => parseInt(b.score, 10) - parseInt(a.score, 10);
    setScoreOrder(scoreOrder === 'asc' ? 'desc' : 'asc');
    setList(allList.sort(scoreOrder === 'asc' ? sortDesc : sortAsc));
  };
  const handleSortReleaseDate = () => {
    virtualizeRef && virtualizeRef.current.scrollTo(0, 0);
    const sortAsc = (a, b) =>
      parseInt(a.release_year, 10) - parseInt(b.release_year, 10);
    const sortDesc = (a, b) =>
      parseInt(b.release_year, 10) - parseInt(a.release_year, 10);
    setReleaseOrder(releaseOrder === 'asc' ? 'desc' : 'asc');
    setList(allList.sort(releaseOrder === 'asc' ? sortDesc : sortAsc));
  };

  const Row = ({ index, style }) => (
    <ul className="list-group fixed-item-height" style={style}>
      <GamesList data={list[index]} />
    </ul>
  );

  return (
    <>
      <Header />
      <div className="container">
        <SearchFilter
          handleSearch={handleSearch}
          handleSortScore={handleSortScore}
          handleSortReleaseDate={handleSortReleaseDate}
        />
        {!list ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="virtualize">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className="List"
                  height={height}
                  itemCount={list.length}
                  itemSize={itemHeight}
                  width={width}
                  ref={virtualizeRef}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </div>
        )}
      </div>
    </>
  );
}

export default SapientGames;
