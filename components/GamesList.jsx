/* eslint-disable react/prop-types */
import React from 'react';

function GamesList({ data }) {
  return (
    <a
      href={'http://www.ign.com' + data.url}
      className="text-decoration-none list-group-item list-group-item-action"
      target="_blank"
    >
      {data.editors_choice === 'Y' && (
        <span className="badge badge-sapient">Editors choice</span>
      )}
      <h3 className="list-group-item-title">{data.title}</h3>
      <h4 className="list-group-item-platform">{data.platform}</h4>
      <p className="list-group-item-desc">
        {data.genre} | {data.release_year} | Score : {data.score}
      </p>
    </a>
  );
}

export default GamesList;
