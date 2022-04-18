/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import data from './ListData.json';

function List(props) {
  const [suppliers, setSuppliers] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/suppliers', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('#suppliers#');
      console.log(response);
      setSuppliers(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create a new array by filtering the original array
  const filteredSuppliers = suppliers.filter((el) => {
    // if no input the return the original
    if (props.input === '') {
      return el;
    }
    // return the item which contains the user input

    return el.text.toLowerCase().includes(props.input);
  });
  return (
    <ul className="suppliers-list">
      {filteredSuppliers.map((supplier) => (
        <Link to={`/suppliers/${supplier.id}`} key={supplier.id}>
          <li key={supplier.id}>{supplier.firstname}-{supplier.lastname}</li>
        </Link>
      ))}
    </ul>
  );
}

export default List;
