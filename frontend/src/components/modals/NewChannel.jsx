import React, { useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../../api/channelsApi.js';
import { createSchemaValidationNewChannel } from './validate.js';
import {
  selectIsSuccses,
  selectError,
} from '../../store/slice/appSlice.js';
import filterText from '../../utils/filterText.js';

const NewChannel = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const isSuccses = useSelector(selectIsSuccses);
  const errorStatus = useSelector(selectError);
  const channelNames = channels ? channels.map((channel) => channel.name) : [];
  const inputRef = useRef(null);
  const validationSchema = createSchemaValidationNewChannel(channelNames, t);
  const [addChannel] = useAddChannelMutation();
  const createNewChannel = async (values) => {
    const { name } = values;
    const data = {
      name: filterText(name),
    };
    await addChannel(data).unwrap();
  };

  useEffect(() => {
    if (isSuccses) {
      toast.success(t('toast.channelCreatedSuccessfully'));
      handleClose();
    }

    if (!isSuccses && errorStatus === 'FETCH_ERROR') {
      toast.error(t('toast.networkError'));
      handleClose();
    }
  }, [isSuccses, errorStatus, t, handleClose]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.titleAdd')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={createNewChannel}
        >
          {({
            errors, isSubmitting, isValid,
          }) => (
            <Form>
              <Field
                name="name"
                type="text"
                innerRef={inputRef}
                className={`form-control ${!isValid ? 'mb-2 is-invalid' : 'mb-2'}`}
                id="name"
              />
              <label className="visually-hidden" htmlFor="name">{t('modal.label')}</label>
              {!isValid && <div className="invalid-feedback">{errors.name}</div>}
              <div className="d-flex justify-content-end">
                <div className="me-2">
                  <Button variant="secondary" onClick={handleClose}>{t('modal.cancel')}</Button>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
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

export default NewChannel;
