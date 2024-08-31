import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createSchemaValidationRenameChannel } from './validate';
import {
  selectModalChannelName,
  selectModalChannelId,
  selectIsSuccses,
  selectError,
} from '../../store/slice/appSlice';
import { useEditChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import filterText from '../../utils/filterText';

const RenameChannel = (props) => {
  const { handleClose } = props;
  const inputRef = useRef(null);

  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels ? channels.map((channel) => channel.name) : [];
  const modalChannelName = useSelector(selectModalChannelName);
  const сhannelId = useSelector(selectModalChannelId);
  const isSuccses = useSelector(selectIsSuccses);
  const errorStatus = useSelector(selectError);
  const { t } = useTranslation();
  const validationSchema = createSchemaValidationRenameChannel(channelNames, t);
  const [editChannel] = useEditChannelMutation();
  const renameChannel = async (values) => {
    const { name } = values;
    const data = {
      name: filterText(name),
      id: сhannelId,
    };
    await editChannel(data).unwrap();
  };

  // useEffect(
  //   () => {
  //     debugger
  //     console.log(channels, modalChannelName, сhannelId, isSuccses, errorStatus, editChannel);
  //   },
  //   [, modalChannelName, , , errorStatus, editChannel, t]
  // )

  useEffect(
    () => {
      console.log('channels', channels)
    },
    [channels]
  )

  useEffect(
    () => {
      console.log('modalChannelName', modalChannelName)
    },
    [modalChannelName]
  )

  useEffect(
    () => {
      console.log('сhannelId', сhannelId)
    },
    [сhannelId]
  )

  useEffect(
    () => {
      console.log('isSuccses', isSuccses);
    },
    [isSuccses]
  )

  useEffect(
    () => {
      console.log('errorStatus', errorStatus)
    },
    [errorStatus]
  )

  useEffect(
    () => {
      console.log('editChannel', editChannel)
    },
    [editChannel]
  )

  useEffect(
    () => {
      console.log('t', t)
    },
    [t]
  )

  useEffect(
    () => {
      console.log('inputRef', inputRef);
    },
    [inputRef.current]
  )

  useEffect(
    () => {
      console.log('handleClose', handleClose);
    },
    [handleClose]
  )

  // useEffect(
  //   () => {

  //   },
  //   []
  // )

  
  useEffect(
    () => {
      inputRef.current.select();
      debugger
      console.log('Component ready')
    },
    [],
  )

  useEffect(() => {
    if (isSuccses) {
      toast.success(t('toast.сhannelRenamedSuccessfully'));
      handleClose();
    }

    if (!isSuccses && errorStatus === 'FETCH_ERROR') {
      toast.error(t('toast.networkError'));
      handleClose();
    }
  }, [isSuccses, errorStatus, t, handleClose]);

  // useEffect(() => {
  //   const myProps = props;
  //   debugger
  //   console.log(myProps);
  // });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: modalChannelName,
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={renameChannel}
        >
          {({
            errors, handleSubmit, handleChange, isValid, values,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                ref={inputRef}
                className={`form-control ${!isValid ? 'mb-2 is-invalid' : 'mb-2'}`}
                id="name"
                autoFocus
              />

              <Form.Label className="visually-hidden" htmlFor="name">{t('modal.label')}</Form.Label>
              {!isValid && <Form.Control.Feedback className="invalid-feedback">{errors.name}</Form.Control.Feedback>}
              <div className="d-flex justify-content-end">
                <div className="me-2">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                  >
                    {t('modal.cancel')}
                  </Button>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                >
                  {t('modal.send')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
