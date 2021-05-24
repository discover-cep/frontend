import React, { ReactElement } from 'react';
import logo from '../../assets/logo.png';
import './styles.css';

function Header():ReactElement {
  return (
    <div className="header">
      <img src={logo} alt="Discorver cep logo" />
      <h1>
        Discover
        <strong>CEP</strong>
      </h1>
    </div>
  );
}

export default Header;
