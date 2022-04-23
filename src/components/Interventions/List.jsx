/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import data from './ListData.json';

function List({ input }) {
  const [inters, setInters] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/interventions', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('get interventions', response.data);
      setInters(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create a new array by filtering the original array
  const filteredInters = inters.filter((el) => {
    // if no input the return the original
    if (input === '') {
      return el;
    }
    // return the item which contains the user input

    return el.title.toLowerCase().includes(input)
    || el.status.toLowerCase().includes(input);
  });
  return (
    <ul className="interventions-list">
      {filteredInters.map((intervention) => (
        <Link to={`/interventions/${intervention.id}`} key={intervention.id}>
          <li
            key={intervention.id}
          >
            {intervention.title}
            {/* <span className="interventions__status">{intervention.status}</span> */}
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default List;
