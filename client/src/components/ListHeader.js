import { useState } from 'react';
import Modal from './Modal';
import { useCookies } from 'react-cookie';

const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(null);
  const handleSignout = () => {
    removeCookie('Email');
    removeCookie('AuthToken');
    // reset window to clear cookies
    window.location.reload();
  };
  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          Add New
        </button>
        <button className="signout" onClick={handleSignout}>
          Sign Out
        </button>
      </div>
      {showModal && (
        <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
