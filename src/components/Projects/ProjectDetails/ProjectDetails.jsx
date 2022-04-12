/* eslint-disable react/react-in-jsx-scope */
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import ProjectDetailsHeader from '../ProjectDetailsHeader/ProjectDetailsHeader';

// eslint-disable-next-line react/prop-types
function ProjectDetails() {
  // const params = useParams();
  const { id } = useParams();
  console.log(id);

  return (
    <div className="projectDetails">
      <ProjectDetailsHeader />
      <h1>page détail du projet {id}</h1>
      <Link to={`/projects/${id}/documents_list`}>
        <Button>Documents</Button>
      </Link>
    </div>
  );
}

export default ProjectDetails;
