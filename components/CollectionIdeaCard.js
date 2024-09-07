import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function CollectionIdeaCard({ obj, onClick, isSelected }) {
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
        src={obj?.cover}
        alt={obj?.name}
        style={{ height: '100px' }}
      />
      <Card.Body>
        <Card.Title>{obj?.name}</Card.Title>
        <div className="author"> By <span className="name">{obj.user?.username}</span></div>
      </Card.Body>
    </Card>
  );
}

CollectionIdeaCard.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    cover: PropTypes.string,
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

export default CollectionIdeaCard;
