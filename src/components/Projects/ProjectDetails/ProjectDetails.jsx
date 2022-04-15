/* eslint-disable react/react-in-jsx-scope */
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

  if (!data || !data.client) {
    return null;
  }
  return (
    <div className="projectDetails">
      <div className="projects__details__header">
        <div className="projects__details__notify">
          <Link to="Foo">
            <Icon icon="fe:search" width="30" />
          </Link>
        </div>
        <div className="projects__details__header_title">
          <h1>{data.title}</h1>
        </div>
        <div className="projects__details__header_notifications">
          <Icon icon="emojione-v1:red-circle" width="13" />
        </div>
        <div className="projects__details__header_avatar">
          <Link to="/Profile">
            <Icon
              icon="carbon:user-avatar-filled-alt"
              color="black"
              width="40"
              height="40"
            />
          </Link>
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
          <Link to={`/interventions/${inter.id}/report`}>
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
