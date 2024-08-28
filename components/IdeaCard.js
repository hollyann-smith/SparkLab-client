import React from 'react';
import PropTypes from 'prop-types';

function IdeaCard({ obj }) {
  console.warn('user', obj.user);
  return (
    <div className="card">
      <div
        className="card-image"
      >
        <img
          src={obj?.img}
          alt={obj?.title}
          style={{ height: '150px', width: '100%' }}
        />
      </div>
      <br />
      <div className="category"> {obj.saved ? '❤️' : ''} </div>
      <div className="heading"> {obj.title}
        <div className="author"> By <span className="name">{obj.user.username}</span></div>
      </div>
    </div>
  );
}

IdeaCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
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
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default IdeaCard;
