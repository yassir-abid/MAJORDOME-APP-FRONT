/* eslint-disable react/no-unescaped-entities */

// import dependencies
import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Icon } from '@iconify/react';

// import MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';

// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import projet
import ListProjets from './ListProjets';
// import Avatar from '../Avatar/Avatar';
import './style.scss';

function Client() {
  const [value, setValue] = useState('');

  // récupère l'id de la route
  const { id } = useParams();

  // edit client
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastame] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [comments, setComments] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [clientComments, setClientComments] = useState('');

  // params axios route GET
  const [infos, setInfos] = useState('');
  const token = localStorage.getItem('token');
  const infoClient = async () => {
    try {
      const response = await axios.get(`https://majordome-api.herokuapp.com/api/clients/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response.data);
      setInfos(response.data);
      console.log(infos);
      // edit client
      setFirstname(response.data.firstname);
      setLastame(response.data.lastname);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setNumber(response.data.addresses[0].number);
      setStreet(response.data.addresses[0].street);
      setComments(response.data.addresses[0].comments);
      setPostalCode(response.data.addresses[0].postal_code);
      setCity(response.data.addresses[0].city);
      setClientComments(response.data.comments);
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };
  useEffect(() => {
    infoClient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [comValue, setComValue] = useState('');
  const comHandleChange = (event) => {
    setComValue(event.target.value);
  };

  //   // gestion du switch : readonly false or true
  //   const [editMode, setEditMode] = useState(false);
  //   const switchChange = (event) => {
  //     setEditMode(event.target.checked);
  //   };

  // modal to update client
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const navigate = useNavigate();

  // function to edit one client witch his id
  const editClient = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://majordome-api.herokuapp.com/api/clients/${id}`, {
        firstname,
        lastname,
        phone,
        email,
        number,
        street,
        comments,
        postalCode,
        city,
        clientComments,
      }, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      navigate('/clients');
    } catch (error) {
      console.log('Erreur de chargement', error);
    }
  };

  // function to delete one client with his id
  function clientDelete() {
    if (window.confirm('Etes vous sur de vouloir supprimer ce client ?')) {
      navigate('/clients');
      const clientToDelete = async () => {
        try {
          const response = await axios.delete(`https://majordome-api.herokuapp.com/api/clients/${id}`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
          // console.log(response);
          setInfos(response.data);
        } catch (error) {
          console.log('Erreur de chargement', error);
        }
      };

      clientToDelete();
    }
  }

  if (!infos) {
    return null;
  }

  return (

    <div className="client">
      <header className="client-header">
        <div className="client-header_avatar">
          {/* <Link to="/Profile"> */}
          {/* <Avatar /> */}
          <Icon icon="ri:delete-bin-2-fill" width="30" height="30" onClick={() => clientDelete(infos.id)} />
          {/* </Link> */}
        </div>
        <div className="client-header_title">
          <h1>{infos.firstname} {infos.lastname}</h1>
        </div>
        <div className="client-header_notify">
          {/* lien vers modal */}
          <Icon icon="bxs:edit-alt" width="30" height="30" onClick={handleOpenModal} />
        </div>

      </header>
      <div className="client-detail">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="firstName"
            // label="Prénom"
            value={infos.firstname}
            placeholder="Prénom"
            // defaultValue=""
          />
          <TextField
            id="lastName"
            // label="Nom"
            value={infos.lastname}
            placeholder="Nom"
            // defaultValue=""
          />
          <TextField
            id="phone"
            // label="tel"
            value={infos.phone}
            placeholder="Numéro"
            // defaultValue=""
          />
          <TextField
            id="email"
            // label="email"
            value={infos.email}
            placeholder="Email"
            fullWidth
          />

          {infos.addresses.map((info, index) => (
            <ul>
              <li key={info.id}>
                <p className="client-detail_adresse">Adresse {index + 1}</p>
                <div className="client-detail_adresse-div">
                  <TextField
                    sx={{ width: '10ch' }}
                    id="number"
                    // label="infos.number"
                    value={info.number}
                    placeholder="Numéro"
                    size=""
                  />
                  <TextField
                    id="street"
                    multiline
                    maxRows={4}
                    value={info.street}
                    placeholder="Rue"
                  />
                  <TextField
                    fullWidth
                    id="comments"
                    placeholder="Complément d'adresse"
                    // fullWidth
                    multiline
                    maxRows={4}
                    value={info.comments}
                    onChange={handleChange}
                  />
                  <TextField
                    id="postal_code"
                    label=""
                    value={info.postal_code}
                    placeholder="Code postal"
                  />
                  <TextField
                    id="city"
                    label=""
                    value={infos.addresses[0].city}
                    placeholder="Ville"
                  />
                </div>

                <h2 className="client-detail_com">Commentaire</h2>
                <TextField
                  fullWidth
                  id="comments"
                  label=""
                  placeholder="Notes"
                  multiline
                  maxRows={4}
                  value={infos.comments}

                />
              </li>
            </ul>
          ))}
          <div className="client-detail_btn">
            <ButtonGroup variant="text" size="small">
              {/* TODO: styliser les boutons et les centrer */}
              {/* créer ou vérifier les liens de chaque boutons */}
              <Link to={`/clients/${id}/documents_list`}>
                <Button>Documents</Button>
              </Link>
              <Link to={`/clients/${id}/notifications_list`}>
                <Button>Notifs</Button>
              </Link>
              <Link to={`/clients/${id}/equipments`}>
                <Button>équipements <br />
                  & besoins
                </Button>
              </Link>
              {/* add modal sur btn "ajout projets" */}
              <Button color="success">Ajout <br />Projets
              </Button>
            </ButtonGroup>
          </div>
        </Box>

        <div className="client-list">
          <p>Listes des projets du client</p>
          <ListProjets projects={infos.projects} />
        </div>
      </div>
      {/* modal to edit client */}
      <Modal
        className=""
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="client__modal"
        >
          <h1 className="client__modal__title">Modification du client {infos.firstname} </h1>
          <form className="client__edit" onSubmit={editClient}>
            <TextField
              id="firstName"
              name="firstname"
              label="Prénom"
              value={firstname}
              placeholder="Prénom"
              onChange={(event) => setFirstname(event.target.value)}
            />
            <TextField
              id="lastName"
              name="lastname"
              label="Nom"
              value={lastname}
              placeholder="Nom"
              onChange={(event) => setLastame(event.target.value)}
            />
            <TextField
              id="phone"
              name="phone"
            // label="tel"
              value={phone}
              placeholder="Numéro"
              onChange={(event) => setPhone(event.target.value)}
            />
            <TextField
              id="email"
              name="email"
            // label="email"
              value={email}
              placeholder="Email"
              fullWidth
              onChange={(event) => setEmail(event.target.value)}
            />

            {/* <p className="client-detail_adresse">Adresse {index + 1}</p> */}
            <div className="client-detail_adresse-div">
              <TextField
                sx={{ width: '10ch' }}
                id="number"
                name="number"
                    // label="infos.number"
                value={number}
                placeholder="Numéro"
                size=""
                onChange={(event) => setNumber(event.target.value)}
              />
              <TextField
                id="street"
                name="street"
                multiline
                maxRows={4}
                value={street}
                placeholder="Rue"
                onChange={(event) => setStreet(event.target.value)}
              />
              <TextField
                fullWidth
                id="comments"
                name="comments"
                placeholder="Complément d'adresse"
                    // fullWidth
                multiline
                maxRows={4}
                value={comments}
                onChange={(event) => setComments(event.target.value)}
              />
              <TextField
                id="postal_code"
                name="postal_code"
                label=""
                value={postalCode}
                placeholder="Code postal"
                onChange={(event) => setPostalCode(event.target.value)}
              />
              <TextField
                id="city"
                name="city"
                label=""
                value={city}
                placeholder="Ville"
                onChange={(event) => setCity(event.target.value)}
              />
            </div>

            <p className="client-detail_com">Commentaire</p>
            <TextField
              fullWidth
              id="comments"
              name="comments"
              label=""
              placeholder="Notes"
              multiline
              maxRows={4}
              value={clientComments}
              onChange={(event) => setClientComments(event.target.value)}
            />
            <TextField sx={{ m: 1, bgcolor: 'text.disabled' }} fullWidth type="submit" defaultValue="Envoyer" />
          </form>
          <Button className="modal-close1" onClick={handleCloseModal}>Fermer</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Client;
