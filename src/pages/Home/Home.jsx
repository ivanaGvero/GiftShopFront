import React from 'react';
import { Link } from 'react-router-dom';



export default function Home() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundImage: 'url(/pr.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    paddingTop: '5rem',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#FFD180',
    fontSize: '5rem',
    marginBottom: '1rem',
  };

  /*const descriptionStyle = {
    textAlign: 'center',
    color: 'black',
    fontSize: '1.5rem',
    margin: '0 2rem',
  };
  */

  const buttonStyle = {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    backgroundColor: '#FFD180',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Gift Shop</h1>
      <Link to="/product" style={buttonStyle}>
        Check it out!
      </Link>

      <div style={{ flex: '1' }} />

    </div>
  );
}
