/* eslint-disable react/react-in-jsx-scope */
import { useParams } from 'react-router-dom';
import ProjectDetailsHeader from '../ProjectDetailsHeader/ProjectDetailsHeader';

// eslint-disable-next-line react/prop-types
function ProjectDetails() {
  const params = useParams();
  console.log(params);

  return (
    <div className="projectDetails">
      <ProjectDetailsHeader />
      <h1>page détail du projet {params.id}</h1>
    </div>
  );
}

export default ProjectDetails;
