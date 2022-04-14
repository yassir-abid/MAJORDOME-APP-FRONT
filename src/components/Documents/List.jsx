/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState } from 'react';
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
    <ul className="documents-list">
      {filteredData.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export default List;
