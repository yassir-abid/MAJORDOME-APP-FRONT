/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// import './documentsDetail.scss';

import axios from 'axios';

function DocumentsDetail() {
  const { id } = useParams();
  // console.log(id);

  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState('');

  const token = localStorage.getItem('token');

  const loadData = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/documents/${id}`, {
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
  function documentDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce projet ?')) {
      navigate('/documents');
      const documentToDelete = async () => {
        try {
          const response = await axios.delete(`https://majordome-api.herokuapp.com/api/documents/${id}`, {
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

      documentToDelete();
    }
  }

  // function to edit one project with his id
  const editDocument = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://majordome-api.herokuapp.com/api/documents/${id}`, {
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

  // download document
  //   const saveFile = () => {
  //     saveAs(
  //       `${data.path}`,
  //     );
  //   };

  // modal to update project
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (!data) {
    return null;
  }
  return (
    <div>
      <div>
        <div>
          <Icon icon="ri:delete-bin-2-fill" width="30" height="30" onClick={() => documentDelete(data.id)} />
        </div>
        <div>
          <h1>{data.title}</h1>
        </div>
        <div>
          <Icon icon="bxs:edit-alt" width="30" height="30" onClick={handleOpenModal} />
        </div>
      </div>
      <div>
        {data.description}
        {!data.description && <p>Aucune description pour ce document</p>}
      </div>
      {/* <Link to={`${data.path}`}> */}
      <a href={`${data.path}`}>Afficher le document</a>
      {/* </Link> */}
      {/* modal to edit project */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="projects-modal"
        >
          <h1>Modification du document {data.title} </h1>
          <form onSubmit={editDocument}>
            <TextField
              required
              sx={{ m: 1 }}
              fullWidth
              label="Nom du document"
              type="text"
              name="title"
              placeholder="Nom du document"
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
              // value={data.id}
            />
            <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
          </form>
          <Button onClick={handleCloseModal}>Fermer</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default DocumentsDetail;
