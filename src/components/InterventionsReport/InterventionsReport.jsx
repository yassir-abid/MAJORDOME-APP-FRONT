/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InterventionsReportHeader from './InterventionsReportHeader';
import avant from '../../assets/avant.jpeg';
import apres from '../../assets/apres.jpeg';
import './interventionsReport.scss';

function InterventionsReport() {
  return (
    <div className="interventionsReport">
      <InterventionsReportHeader />
      <main className="interventionsReport-main">
        <div className="interventionsReport-container_list">
          <ul>
            <li className="interventionsRepot-main_li">
              <p>Nom du projet</p>
            </li>
            <li className="interventionsReport-main_li">
              <p>Nom du client</p>
            </li>
            <li className="interventionsReport-main_li">
              <p>nom intervention</p>
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                  // value={value}
                  // onChange={handleChange}
                variant="standard"
              />
            </li>
            <div className="interventionReport-main_photo">
              <li className="interventionsReport-main_li">
                <p>Avant</p>
                <CardMedia
                  component="img"
                  height="140"
                  src={avant}
                  alt="green iguana"
                />
              </li>
              <li className="interventionsReport-main_li">
                <p>Après</p>
                <CardMedia
                  component="img"
                  height="140"
                  src={apres}
                  alt="green iguana"
                />
              </li>
            </div>
            <li className="interventionsReport-main_li">
              <div>
                <TextField
                  id="standard-multiline-flexible"
                  label="Rapport"
                  multiline
                  maxRows={3}
                  // value={value}
                  // onChange={handleChange}
                  variant="standard"
                />
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default InterventionsReport;
