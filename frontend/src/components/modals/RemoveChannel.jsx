import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import {
  selectCurrentChannelId,
  selectModalChannelId,
  setDefaultChannel,
  selectError,
  selectIsSuccses,
} from '../../store/slice/appSlice';

const RemoveChannel = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const modalChannelId = useSelector(selectModalChannelId);
  const isSuccses = useSelector(selectIsSuccses);
  const errorStatus = useSelector(selectError);
  const deleteChannel = async (id) => {
    await removeChannel(id).unwrap();
    if (id === currentChannelId) {
      dispatch(setDefaultChannel());
    }
  };

  useEffect(() => {
    if (isSuccses) {
      toast.success(t('toast.channelDeletedSuccessfully'));
      handleClose();
    }

    if (!isSuccses && errorStatus === 'FETCH_ERROR') {
      toast.error(t('toast.networkError'));
      handleClose();
    }
  }, [isSuccses, errorStatus, t, handleClose]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modal.text')}
        <div className="d-flex justify-content-end">
          <div className="me-2">
            <Button variant="secondary" onClick={handleClose}>
              {t('modal.cancel')}
            </Button>
          </div>
          <Button variant="danger" onClick={() => deleteChannel(modalChannelId)}>{t('modal.remove')}</Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannel;
