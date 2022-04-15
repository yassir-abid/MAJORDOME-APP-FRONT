/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

// import ProjectDetail from './ProjectDetail';
import './projectDetails.scss';

// eslint-disable-next-line react/prop-types
function ProjectDetails() {
  // const params = useParams();
  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState({});

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

  const navigate = useNavigate();

  function projectDelete() {
    alert('Etes vous sur de vouloir supprimer ce projet ?');
    navigate('/projects');
    const projectToDelete = async () => {
      try {
        const response = await axios.delete(`https://majordome-api.herokuapp.com/api/projects/${id}`, {
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

    projectToDelete();
  }

  if (!data || !data.client) {
    return null;
  }
  return (
    <div className="projectDetails">
      <div className="projects__details__header">
        <div className="projects__details__notify">
          <Icon icon="ri:delete-bin-2-fill" width="40" height="40" onClick={() => projectDelete(data.id)} />
        </div>
        <div className="projects__details__header_title">
          <h1>{data.title}</h1>
        </div>
        <div className="projects__details__header_avatar">
          <Icon icon="bxs:edit-alt" width="40" height="40" />
        </div>
      </div>
      <h2 className="projectDetails__client__name">Projet lié à {data.client.firstname} {data.client.lastname}</h2>
      <div className="projectDetails__description">
        {data.description}
        {!data.description && <p>Aucune déscription pour ce projet</p>}
      </div>
      <Link to={`/projects/${data.id}/documents_list`}>
        <button type="button" className="projectDetails__documents">Documents</button>
      </Link>
      <Link to={`/projects/${data.id}/notifications`}>
        <button type="button" className="projectDetails__documents">Notifications</button>
      </Link>
      <h3>Détails intervention(s)</h3>
      <ul className="projectDetails__interventions__container">
        {data.interventions.map((inter) => (
          <Link to={`/interventions/${data.id}/report`}>
            <li key={inter.id}>
              {inter.title}
              <span className="projectDetails__interventions__status">
                {inter.status}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetails;
