/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import InterventionsDetailHeader from './InterventionsDetailHeader';
import './interventionsDetail.scss';

function InterventionsDetail() {
  // récupère l'id de la route
  const { id } = useParams();
  return (
    <div className="interventionsDetail">
      <InterventionsDetailHeader />
      <main className="interventionsDetail-main">
        <div className="interventionsDetail-container_list">
          <ul>
            <li className="interventionsDetail-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="interventionsDetail-main_li">
              <p>Nom du client</p>
            </li>
            <li className="interventionsDetail-main_li">

              <div>
                <TextField
                  id="standard-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={4}
                  // value={value}
                  // onChange={handleChange}
                  variant="standard"
                />
              </div>
            </li>
            <li className="interventionsDetail-main_li">
              <p>Documents</p>
            </li>
            <li className="interventionsDetail-main_li">
              <Link to={`/interventions/${id}/report`}>
                {/* FIXME: insérer un button à la place de p */}
                <p>Rapport d intervention</p>
              </Link>
            </li>
            <li className="interventionsDetail-main_li">
              <div>
                <TextField
                  id="standard-multiline-flexible"
                  label="Notification"
                  multiline
                  maxRows={2}
                  // value={value}
                  // onChange={handleChange}
                  variant="standard"
                />
              </div>
            </li>
            <li className="interventionsDetail-main_li">
              <p>Commentaire</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default InterventionsDetail;
