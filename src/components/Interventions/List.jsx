/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import data from './ListData.json';

function List(props) {
  // create a new array by filtering the original array
  const filteredData = data.filter((el) => {
    // if no input the return the original
    if (props.input === '') {
      return el;
    }
    // return the item which contains the user input

    return el.text.toLowerCase().includes(props.input);
  });
  return (
    <ul className="interventions-list">
      {filteredData.map((item) => (
        <Link to={`/interventions/${item.id}`} key={item.id}>
          <li key={item.id}>{item.text}</li>
        </Link>
      ))}
    </ul>
  );
}

export default List;
