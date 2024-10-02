/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteSingleIdea, getSingleIdea } from '../../utils/data/ideaData';
import { useAuth } from '../../utils/context/authContext';
import CollectionModal from '../../components/CollectionModal';

export default function ViewSingleIdea() {
  const [idea, setIdea] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (id) {
      getSingleIdea(id).then((fetchedIdea) => {
        setIdea(fetchedIdea);
      });
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      try {
        await deleteSingleIdea(id);
        router.push('/ideas');
      } catch (error) {
        console.error('Failed to delete the post', error);
      }
    }
  };

  return (
    <div
      className="back-group"
      style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <button
        type="button"
        onClick={handleBack}
        className="back-button"
        style={{
          maxHeight: '60px', maxWidth: '60px', justifyContent: 'center', background: 'transparent', border: 'none', marginRight: '20px',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>
      </button>
      <div className="ideaView">
        <div className="ideaLeft">
          <h1>{idea.title}</h1>
          <br />
          <div className="description" width="350px">
            {idea.description}
          </div>
        </div>
        <div className="img">
          <img
            src={idea?.img}
            alt={idea?.title}
            style={{
              height: '350px', width: '350px', borderRadius: '15px', marginBottom: '15px',
            }}
          />
          <div className="ideaSupplies">
            {idea.supplies?.map((supply) => (
              <button
                key={supply.id}
                className="supply-button"
                type="button"
              >
                {supply.name}
              </button>
            ))}

          </div>
          <br />
          <br />
          <br />
          <div className="edit-delete">
            {user && idea?.user?.uid === user?.uid ? (
              <>
                <button type="button" className="bttn" onClick={handleDelete}>
                  <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon">
                    <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill" />
                  </svg>
                </button>
                <Link href={`edit/${idea.id}`} passHref>
                  <button type="button" className="btttn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </button>
                </Link>
                <CollectionModal ideaId={Number(id)} />
              </>
            ) : (
              <CollectionModal ideaId={Number(id)} />
            )}
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
