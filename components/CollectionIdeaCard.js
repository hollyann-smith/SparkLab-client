// import React from 'react';
// import PropTypes from 'prop-types';
// import { Card } from 'react-bootstrap';

// function CollectionIdeaCard({ obj }) {
//   return (
//     <div className="IdeaCard">
//       <Card style={{ width: '18rem', margin: '10px' }}>
//         <p>
//           <Card.Img
//             variant="top"
//             src={obj?.img}
//             alt={obj?.title}
//             style={{ height: '200px' }}
//           />
//         </p>
//         <h2>{obj?.title}</h2>
//       </Card>
//     </div>
//   );
// }

// CollectionIdeaCard.propTypes = {
//   obj: PropTypes.shape({
//     title: PropTypes.string,
//     description: PropTypes.string,
//     saved: PropTypes.bool,
//     img: PropTypes.string,
//     supplies: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//     })),
//     id: PropTypes.number,
//   }).isRequired,
// };

// export default CollectionIdeaCard;
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function CollectionIdeaCard({ obj, onClick }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      className="IdeaCard"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`Select ${obj.title}`}
      style={{ cursor: 'pointer' }}
    >
      <Card style={{ width: '18rem', margin: '10px' }}>
        <p>
          <Card.Img
            variant="top"
            src={obj?.img}
            alt={obj?.title}
            style={{ height: '200px' }}
          />
        </p>
        <h2>{obj?.title}</h2>
      </Card>
    </div>
  );
}

CollectionIdeaCard.propTypes = {
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
  onClick: PropTypes.func.isRequired, // Ensure onClick is passed as a prop
};

export default CollectionIdeaCard;
