import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import logo from '../../assets/butler.png';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <div className="home-header_logo">
          <img className="home-header_logo-1" src={logo} alt="Logo" />
        </div>
        <h1>Hello !</h1>
      </header>
      <main className="home-main">
        <p>
          Majordome,<br />
          C’est un outil de gestion d’activité,
          un assistant personnel à destination des auto-entrepreneurs,
          artisans où toutes personnes travaillant seules de manière itinérante.
          Majordome va vous aider à organiser votre journée, ranger vos documents,
          gérer vos clients, votre activité et vos interventions.
        </p>
      </main>
      <footer className="home-footer">
        <div>
          <Link to="/login">
            <button type="button" className="home-footer_login">
              Connexion
            </button>
          </Link>
        </div>
        <div>
          <Link to="/signup">
            <button type="button" className="home-footer_signUp">
              Inscription
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;
