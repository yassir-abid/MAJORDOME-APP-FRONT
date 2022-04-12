/* eslint-disable react/react-in-jsx-scope */
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import ProjectDetailsHeader from '../ProjectDetailsHeader/ProjectDetailsHeader';
import ProjectDetail from './ProjectDetail';

// eslint-disable-next-line react/prop-types
function ProjectDetails() {
  // const params = useParams();
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const loadData = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/projects/${id}`, {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="projectDetails">
      <ProjectDetailsHeader />
      <h1>page détail du projet {id}</h1>
      <Link to={`/projects/${id}/documents_list`}>
        <Button>Documents</Button>
      </Link>
      {data.map((project) => (
        <ProjectDetail
          key={project.id}
          {... project}
        />
      ))};
    </div>
  );
}

export default ProjectDetails;
