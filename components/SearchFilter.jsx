/* eslint-disable react/prop-types */
import React from 'react';

function SearchFilter({
  handleSearch,
  handleSortScore,
  handleSortReleaseDate,
}) {
  return (
    <div className="row">
      <div className="col-12 mb-2">
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
  );
}

export default SearchFilter;
