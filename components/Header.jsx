import React from 'react';

const Header = props => {
  return (
    <div className="container header">
      <div className="row">
        <div className="col-12">
          <h1>{props.title}</h1>
        </div>
      </div>
    </div>
  );
};
Header.defaultProps = {
  title: 'Sapient Games Arena',
  subtitle: 'Games Arena',
};

export default Header;
