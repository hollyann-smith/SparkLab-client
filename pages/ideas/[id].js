/* eslint-disable jsx-a11y/control-has-associated-label */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import Link from 'next/link';
import Link from 'next/link';
import { getSingleIdea } from '../../utils/data/ideaData';

export default function ViewSingleIdea() {
  const [idea, setIdea] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleIdea(id).then(setIdea);
    }
  }, [id]);

  return (
    <div className="ideaView">
      <div className="ideaLeft">
        <h1>{idea.title}</h1>
        {idea.description}
      </div>
      <div className="img">
        <img
          src={idea?.img}
          alt={idea?.title}
          style={{ height: '250px', width: '250px' }}
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
          <button type="button" className="bttn">
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
        </div>
      </div>
    </div>
  );
}
