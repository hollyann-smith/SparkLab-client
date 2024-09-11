import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { updateIdea } from '../utils/data/ideaData';
import CollectionModal from './CollectionModal';

function IdeaCard({ obj }) {
  const [saved, setSaved] = useState(obj.saved);
  // const router = useRouter();
  // const { id } = router.query;

  const handleChange = (e) => {
    const { checked } = e.target;
    setSaved(checked);

    const updatedIdea = {
      id: obj.id,
      title: obj.title,
      description: obj.description,
      saved: checked, // Updated saved value
      img: obj.img,
      supplies: obj.supplies.map((supply) => supply.id),
      user: obj.user.id, // The user object as required
    };

    console.warn('Payload:', updatedIdea);
    updateIdea(obj.id, updatedIdea);
  };

  return (
    <div className="card">
      <div className="heart">
        <CollectionModal ideaId={obj.id} />
        <div className="con-like">
          <input
            className="like"
            type="checkbox"
            title="like"
            id="saved"
            checked={saved}
            onChange={handleChange}
          />
          <div className="checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" className="outline" viewBox="0 0 24 24">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="filled" viewBox="0 0 24 24">
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="celebrate">
              <polygon className="poly" points="10,10 20,20" />
              <polygon className="poly" points="10,50 20,50" />
              <polygon className="poly" points="20,80 30,70" />
              <polygon className="poly" points="90,10 80,20" />
              <polygon className="poly" points="90,50 80,50" />
              <polygon className="poly" points="80,80 70,70" />
            </svg>
          </div>
        </div>
      </div>
      <div
        className="card-image"
      >
        <Link href={`/ideas/${obj.id}`} passHref>
          <img
            src={obj?.img}
            alt={obj?.title}
            style={{
              height: '150px', width: '100%', borderRadius: '5px',
            }}
          />
        </Link>
      </div>

      <br />
      <div className="bottomCard"> {obj.title}
        <br />
        <div className="author"> By <span className="name">{obj.user?.username}</span></div>
      </div>
    </div>
  );
}

IdeaCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    saved: PropTypes.bool,
    img: PropTypes.string,
    id: PropTypes.number,
    supplies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default IdeaCard;
