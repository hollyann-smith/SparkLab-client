import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

function CollectionCard({ obj }) {
  return (
    <div className="IdeaCard">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <p>
          <Card.Img
            variant="top"
            src={obj?.cover}
            alt={obj?.name}
            style={{ height: '200px' }}
          />
        </p>
        <h2>{obj?.name}</h2>
        <Link href={`/collections/${obj.id}`} passHref>
          <Button variant="primary" className="lg">VIEW</Button>
        </Link>
        <br />
      </Card>
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
    id: PropTypes.number,
  }).isRequired,
};

export default CollectionCard;
