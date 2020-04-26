import React, { useRef, useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import GamesList from './GamesList';
import Header from './Header';

const API = 'http://starlord.hackerearth.com/gamesext';

function SapientGames(props) {
  const virtualizeRef = useRef();
  const [list, setList] = useState();
  const [allList, setallList] = useState([]);
  const [search, setSearch] = useState('');
  const [scoreOrder, setScoreOrder] = useState('asc');
  const [releaseOrder, setReleaseOrder] = useState('asc');
  const [itemHeight, setItemHeight] = useState(135);
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
    virtualizeRef.current.scrollTo(0, 0);
    setList(filterByValue(allList, event.target.value));
  };
  const handleSortScore = event => {
    virtualizeRef.current.scrollTo(0, 0);
    const sortAsc = (a, b) => parseInt(a.score, 10) - parseInt(b.score, 10);
    const sortDesc = (a, b) => parseInt(b.score, 10) - parseInt(a.score, 10);
    setScoreOrder(scoreOrder === 'asc' ? 'desc' : 'asc');
    setList(allList.sort(scoreOrder === 'asc' ? sortDesc : sortAsc));
  };
  const handleSortReleaseDate = event => {
    virtualizeRef.current.scrollTo(0, 0);
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
    // <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    //   Row {index}
    // </div>
  );

  /* <ul className="list-group">
          {list.map(function(data, i) {
            return <GamesList data={data} />;
          })}
        </ul> */

  return (
    <>
      <Header />
      <div className="container">
        <div class="row">
          <div class="col-12 mb-2">
            <form>
              <fieldset className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search games.."
                  onChange={handleSearch}
                />
              </fieldset>
            </form>
            <div className="btn-group float-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSortScore}
              >
                Sort By Score
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSortReleaseDate}
              >
                Sort By Release
              </button>
            </div>
          </div>
        </div>
        {!list ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
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
        {/* <ul className="list-group">
          {list.map(function(data, i) {
            return <GamesList data={data} />;
          })}
        </ul> */}
      </div>
    </>
  );
}

export default SapientGames;
