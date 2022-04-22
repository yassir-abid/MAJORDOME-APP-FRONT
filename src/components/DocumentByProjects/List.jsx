/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// import data from './ListData.json';

function List(props) {
  const { id } = useParams();

  const [docs, setDocs] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/documents/projects/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log('#documents#');
      console.log(response);
      setDocs(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create a new array by filtering the original array
  const filteredDocs = docs.filter((el) => {
    // if no input the return the original
    if (props.input === '') {
      return el;
    }
    // return the item which contains the user input

    return el.title.toLowerCase().includes(props.input);
  });
  return (
    <ul className="documents-list">
      {filteredDocs.map((item) => (
        <Link to={`/documents/${item.id}`} key={item.id}>
          <li key={item.id}>{item.title}</li>
        </Link>
      ))}
    </ul>
  );
}

export default List;
