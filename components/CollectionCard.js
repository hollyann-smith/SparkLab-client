import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

function CollectionCard({ obj }) {
  return (
    <div className="collection-card">
      <div className="collection-image">
        <Link href={`/collections/${obj.id}`} passHref>
          <Card.Img
            variant="top"
            src={obj?.cover}
            alt={obj?.name}
            style={{ height: '200px', position: 'relative' }}
          />
        </Link>
        <div className="title-overlay">
          <h2>{obj?.name}</h2>
          By <span className="name">{obj.user?.username}</span>
        </div>
      </div>
    </div>
  );
}

CollectionCard.propTypes = {
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
    }),
    id: PropTypes.number,
  }).isRequired,
};

export default CollectionCard;
