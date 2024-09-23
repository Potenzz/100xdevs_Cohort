import React from 'react';
import './Card.css';

const Card = ({ name, description, linkedIn, twitter, otherHandles, interests }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="social-media">
        {linkedIn && <a href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
        {otherHandles && Object.entries(otherHandles).map(([platform, url]) => (
          <a key={platform} href={url} target="_blank" rel="noopener noreferrer">{platform}</a>
        ))}
      </div>
      <div className="interests">
        <h4>Interests:</h4>
        <ul>
          {interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
