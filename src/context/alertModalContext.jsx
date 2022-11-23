import { useContext } from 'react';
import { createContext, useState } from 'react';
import AlertModal from '../components/AlertModal/AlertModal';

const AlertModalContext = createContext();
const useAlertModal = () => useContext(AlertModalContext);
const AlertModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const show = (message) => {
    setMessage(message);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2950);
  };
  return (
    <AlertModalContext.Provider value={{ show }}>
      {isOpen && <AlertModal message={message} />}
      {children}
    </AlertModalContext.Provider>
  );
};
export { useAlertModal, AlertModalProvider };
