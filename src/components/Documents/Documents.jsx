/* eslint-disable import/no-extraneous-dependencies */
import { React, useState } from 'react';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import DocumentsHeader from './DocumentsHeader';
// import './documents.scss';
import List from './ListDocuments';

function Documents() {
  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const StyledFab = styled(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 70,
    right: 25,
    margin: '0 auto',
  });

  return (
    <Box
      sx={{
      // FIXME: régler la hauteur
        height: '100vh',
      }}
    >
      <DocumentsHeader />
      <div>
        <Box
          sx={{
            mt: 2,
            ml: 1,
            mr: 1,

          }}
        >
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </Box>
        <List input={inputText} />
      </div>
      <div>
        <StyledFab size="medium" color="primary" aria-label="add">
          <AddIcon onClick={handleOpenModal} />
        </StyledFab>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <form>
            <TextField
              required
              sx={{ m: 1 }}
              fullWidth
              label="Titre du document"
              type="text"
              name="title"
              placeholder="Titre du document"
            //   value={title}
            //   onChange={handleChange}
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
            //   value={description}
            //   onChange={handleChange}
            />
            <TextField
              type="file"
              name="upload document"
            //   value={comments}
            //   onChange={handleChange}
            />
            <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
          </form>
          <Button onClick={handleCloseModal}>Fermer</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Documents;
