import React from 'react';
import Card from './components/Card';

function App() {
  const cardData = {
    name: "John Doe",
    description: "Software Engineer with a passion for open source and web development.",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    otherHandles: { GitHub: "https://github.com/johndoe", Instagram: "https://instagram.com/johndoe" },
    interests: ["Web Development", "Open Source", "Traveling", "Photography"]
  };

  return (
    <div className="App">
      <h1>Business Cards</h1>
      <Card
        name={cardData.name}
        description={cardData.description}
        linkedIn={cardData.linkedIn}
        twitter={cardData.twitter}
        otherHandles={cardData.otherHandles}
        interests={cardData.interests}
      />
    </div>
  );
}

export default App;
