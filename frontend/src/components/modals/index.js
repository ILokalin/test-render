import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import NewChannel from './NewChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { selectShowModal, closeModal, selectIsOpen } from '../../store/slice/appSlice';

const modalsTypes = {
  adding: NewChannel,
  remove: RemoveChannel,
  renaming: RenameChannel,
};

const ModalContainer = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const showModal = useSelector(selectShowModal);
  const isOpen = useSelector(selectIsOpen);
  const Container = modalsTypes[showModal];

  useEffect(
    () => {
      debugger
    },
    []
  )
  if (!Container) return null;

  return (
    <Modal show={isOpen} animation={false} onHide={handleCloseModal} centered>
      <Container handleClose={handleCloseModal} Modal={Modal}/>
    </Modal>
  );
};

export default ModalContainer;
