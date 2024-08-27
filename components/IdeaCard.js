import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import Image from 'next/image';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleIdea } from '../utils/data/ideaData';

function IdeaCard({ obj }) {
  const deletethisIdea = () => {
    if (window.confirm(`Delete ${obj.title}?`)) {
      deleteSingleIdea(obj.id).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="IdeaCard">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <p>
          <Card.Img
            variant="top"
            src={obj.img}
            alt={obj.title}
            style={{ height: '200px' }}
          />
        </p>
        <h2>{obj.title}</h2>
        <p>
          {obj.supplies.map((supply) => (
            <span key={supply.id}>{supply.name} </span>
          ))}
        </p>
        <p>
          {obj.saved ? '❤️' : ''}
        </p>
        <Link href={`/ideas/${obj.id}`} passHref>
          {/* <button type="button" className="btn">View</button> */}
          <Button variant="primary" className="lg">VIEW</Button>
        </Link>
        <br />
        {/* <Link href={`/ideas/edit/${obj.id}`} passHref> */}
        {/* <button type="button" className="btn">Edit</button> */}
        {/* <Button variant="warning" className="lg">EDIT</Button>
        </Link> */}
        <Button variant="danger" className="btn" onClick={deletethisIdea}>DELETE</Button>
      </Card>
    </div>
  );
}

IdeaCard.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    saved: PropTypes.bool,
    img: PropTypes.string,
    supplies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    id: PropTypes.number,
  }).isRequired,
};

export default IdeaCard;
