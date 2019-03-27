import React from 'react';
import Decade from './Decade';
import './Decades.css';

const Decades = (props) => {

  const decades = [
    {id: 0, title: '80\'s', minYear: 1980, maxYear: 1989},
    {id: 1, title: '90\'s', minYear: 1990, maxYear: 1999},
    {id: 2, title: '00\'s', minYear: 2000, maxYear: 2009},
    {id: 3, title: '10\'s', minYear: 2010, maxYear: 2019},
    {id: 4, title: 'I need not be limited.', minYear: 1980, maxYear: 2019}
  ];

  const decadeSelectionHandler = (decadeId) => {
    const [decade] = decades.filter((decade) => { return decade.id === decadeId } );
    props.click(decade.minYear, decade.maxYear);
  }

  const getDecades = () => {
    return decades.map((decade) => {
      return <Decade key={decade.id} decade={decade} click={decadeSelectionHandler} />;
    });
  }
 
  return (
    <div className="DecadesList">
      {getDecades()}
    </div>
  );
}

export default Decades;