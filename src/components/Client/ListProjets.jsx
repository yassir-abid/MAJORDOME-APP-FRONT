/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import data from './data.json';

function ListProjets(props) {
  return (
    <ul className="client-listProjets">
      {data.map((item) => (
        <Link to={`/projets/${item.id}`}>
          <li key={item.id}>{item.title} {item.description} {item.status} </li>
        </Link>
      ))}
    </ul>
  );
}

export default ListProjets;
