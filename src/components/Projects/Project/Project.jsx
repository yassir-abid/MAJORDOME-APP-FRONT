/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import './project.scss';

function Project({ title, status }) {
  return (

    <div className="project">
      <div className="project__title">
        {title}
      </div>
      <span className="project__status">
        {status}
      </span>
    </div>
  );
}

Project.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Project;
