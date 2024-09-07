import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function CollectionFormIdeaCard({ obj, onClick, isSelected }) {
  return (
    <Card
      style={{
        width: '9rem',
        margin: '10px',
        cursor: 'pointer',
        border: isSelected ? '2px solid blue' : '1px solid gray',
      }}
      onClick={() => onClick(obj.id)}
    >
      <Card.Img
        variant="top"
        src={obj?.img}
        alt={obj?.title}
        style={{ height: '100px' }}
      />
      <Card.Body>
        <Card.Title>{obj?.title}</Card.Title>
        <div className="author"> By <span className="name">{obj.user?.username}</span></div>
      </Card.Body>
    </Card>
  );
}

CollectionFormIdeaCard.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    img: PropTypes.string,
    ideas: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })),
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
    id: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default CollectionFormIdeaCard;
