/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// import ProjectDetail from './ProjectDetail';
import './projectDetails.scss';

// eslint-disable-next-line react/prop-types
function ProjectDetails() {
  // const params = useParams();
  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState('');

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
      // edit the modal
      setTitle(response.data.title);
      setDescription(response.data.description);
      setComments(response.data.comments);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  // function to delete one project with his id
  function projectDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce projet ?')) {
      navigate('/projects');
      const projectToDelete = async () => {
        try {
          const response = await axios.delete(`https://majordome-api.herokuapp.com/api/projects/${id}`, {
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

      projectToDelete();
    }
  }

  // function to edit one project with his id
  const editProject = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://majordome-api.herokuapp.com/api/projects/${id}`, {
        title,
        description,
        comments,
        client_id: data.client.id,
      }, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      navigate('/projects');
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  // modal to update project
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (!data || !data.client) {
    return null;
  }
  return (
    <div className="projectDetails">
      <div className="projects__details__header">
        <div className="projects__details__delete">
          <Icon icon="ri:delete-bin-2-fill" width="30" height="30" onClick={() => projectDelete(data.id)} />
        </div>
        <div className="projects__details__header_title">
          <h1>{data.title}</h1>
        </div>
        <div className="projects__details__header_avatar">
          <Icon icon="bxs:edit-alt" width="30" height="30" onClick={handleOpenModal} />
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
          <Link to={`/interventions/${inter.id}/report`} key={inter.id}>
            <li>
              {inter.title}
              <span className="projectDetails__interventions__status">
                {inter.status}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      {/* modal to edit project */}
      <Modal
        className=""
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="projects-modal"
        >
          <h1 className="projects__modal__title">Modification du projet {data.title} </h1>
          <form className="project__add" onSubmit={editProject}>
            <TextField
              required
              sx={{ m: 1 }}
              fullWidth
              label="Nouveau nom du projet"
              type="text"
              name="title"
              placeholder="Nom du projet"
              value={title}
              // onChange={handleChange}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              sx={{ m: 1 }}
              id="outlined-multiline-static"
              label="Description"
              fullWidth
              multiline
              rows={4}
              name="description"
              placeholder="Description"
              value={description}
              // onChange={handleChange}
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
              sx={{ m: 1 }}
              id="outlined-multiline-static"
              label="Commentaires"
              fullWidth
              multiline
              maxRows={4}
              name="comments"
              placeholder="Commentaires"
              value={comments}
              // onChange={handleChange}
              onChange={(event) => setComments(event.target.value)}
            />
            <TextField
              sx={{ m: 1 }}
              id="outlined-multiline-static"
              label="client_id"
              fullWidth
              multiline
              maxRows={4}
              name="client_id"
              placeholder="client_id"
              value={data.client.id}
            />
            <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
          </form>
          <Button className="modal-close1" onClick={handleCloseModal}>Fermer</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ProjectDetails;
