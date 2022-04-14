/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import data from './ListData.json';

// const axios = require('axios').default;

function List(props) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/clients', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // create a new array by filtering the original array
  const filteredData = data.filter((el) => {
    // if no input the return the original
    if (props.input === '') {
      return el;
    }
    // return the item which contains the user input
    // modifier pour avoir une multi recherche sur first et lastName
    return (el.firstname.toLowerCase().includes(props.input))
    || (el.lastname.toLowerCase().includes(props.input));
  });

  return (
    <ul className="clients-list">
      {filteredData.map((item) => (
        <Link to={`/clients/${item.id}`}>
          <li key={item.id}>{item.firstname} {item.lastname}</li>
        </Link>
      ))}
    </ul>
  );
}

export default List;
