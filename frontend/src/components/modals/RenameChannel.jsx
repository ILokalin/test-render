import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createSchemaValidationRenameChannel } from "./validate";
import {
  selectModalChannelName,
  selectModalChannelId,
  selectIsSuccses,
  selectError,
} from "../../store/slice/appSlice";
import {
  useEditChannelMutation,
  useGetChannelsQuery,
} from "../../api/channelsApi";
import filterText from "../../utils/filterText";

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
  const [editChannel] = useEditChannelMutation();
  const renameChannel = async (values) => {
    const { name } = values;
    const data = {
      name: filterText(name),
      id: сhannelId,
    };
    await editChannel(data).unwrap();
  };

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid
  } = useFormik({
    validationSchema: createSchemaValidationRenameChannel(channelNames, t),
    initialValues: {
      name: modalChannelName,
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: renameChannel,
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
    console.log("Component ready");
  }, []);

  useEffect(
    () => {
      console.log(document.querySelector('*:focus'))
    }
  )

  useEffect(() => {
    if (isSuccses) {
      toast.success(t("toast.сhannelRenamedSuccessfully"));
      handleClose();
    }

    if (!isSuccses && errorStatus === "FETCH_ERROR") {
      toast.error(t("toast.networkError"));
      handleClose();
    }
  }, [isSuccses, errorStatus, t, handleClose]);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t("modal.renameChannelTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            ref={inputRef}
            className={`form-control ${!isValid ? "mb-2 is-invalid" : "mb-2"}`}
            id="name"
            // autoFocus
          />

          <Form.Label className="visually-hidden" htmlFor="name">
            {t("modal.label")}
          </Form.Label>
          {!isValid && (
            <Form.Control.Feedback className="invalid-feedback">
              {errors.name}
            </Form.Control.Feedback>
          )}
          <div className="d-flex justify-content-end">
            <div className="me-2">
              <Button variant="secondary" onClick={handleClose}>
                {t("modal.cancel")}
              </Button>
            </div>
            <Button type="submit" variant="primary">
              {t("modal.send")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
