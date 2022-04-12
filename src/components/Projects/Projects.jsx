/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import ProjectsHeader from './ProjectsHeader';
import List from './List';
import './style.scss';

function Projects() {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <div className="projects">
      <ProjectsHeader />
      <div className="projects__container__list">
        <TextField
          className="projects-searchBar"
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
        <List input={inputText} />
      </div>
      <div className="projects__add">
        <Icon onClick={handleOpenModal} icon="carbon:add-filled" width="50" height="50" />
      </div>
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
          <form className="project__add">
            <label>
              <TextField
                sx={{ m: 1 }}
                fullWidth
                label="Nom du projet"
                type="text"
                name="projet"
                // defaultValue="projet"
                placeholder="Nom du projet"
              />
            </label>
            <label>
              <TextField
                sx={{ m: 1 }}
                id="outlined-multiline-static"
                label="Description"
                fullWidth
                multiline
                rows={4}
                placeholder="Description"
                // defaultValue="Description"
              />
            </label>
            <label>
              <TextField
                sx={{ m: 1 }}
                id="outlined-multiline-static"
                label="Commentaires"
                fullWidth
                multiline
                maxRows={4}
                placeholder="Commentaires"
                // defaultValue="Default Value"
              />
            </label>
            <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
          </form>
          <Button className="modal-close1" onClick={handleCloseModal}>Fermer</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Projects;
