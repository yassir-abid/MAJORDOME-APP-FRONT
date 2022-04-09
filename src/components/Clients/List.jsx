/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState } from 'react';
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
    // modifier pour avir une multi recherche sur first et lastName
    return (el.firstName.toLowerCase().includes(props.input))
    || (el.lastName.toLowerCase().includes(props.input));
  });
  return (
    <ul className="clients-list">
      {filteredData.map((item) => (
        <Link to={`/clients/${item.id}`}>
          <li key={item.id}>{item.firstName} {item.lastName}</li>
        </Link>
      ))}
    </ul>
  );
}

export default List;
