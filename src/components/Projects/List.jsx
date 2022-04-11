/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import data from './ListData.json';
import Project from './Project/Project';

function List({ input }) {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get('https://majordome-api.herokuapp.com/api/projects');
      console.log(response.data);
      setData(response.data.response);
    } catch (error) {
      console.log('Il y a eu une erreur au chargement de l\'API', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // create a new array by filtering the original array
  const filteredData = data.filter((el) => {
    if (input === '') {
      return el;
    }
    // return the item which contains the user input

    return el.text.toLowerCase().includes(input);
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
