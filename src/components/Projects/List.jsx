/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Project from './Project/Project';

function List({ input }) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/projects', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      // console.log(response);
      setData(response.data);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create a new array by filtering the original array
  const filteredData = data.filter((el) => {
    if (input === '') {
      return el;
    }
    // return the item which contains the user input

    return el.title.toLowerCase().includes(input)
    || el.status.toLowerCase().includes(input);
  });
  return (
    <ul className="projects-list">
      {filteredData.map((projects) => (
        <li key={projects.id}>
          <Link to={`/projects/${projects.id}`}>
            <Project
              {... projects}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default List;
