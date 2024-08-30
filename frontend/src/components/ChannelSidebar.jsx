import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../api/channelsApi.js';
import { changeChannel, setChannelModal, selectCurrentChannelId } from '../store/slice/appSlice.js';
import Loading from './Spinner.jsx';
import socket from '../socket.js';
import ModalContainer from './modals/index.js';
import DropdownButton from './DropdownButton.jsx';

const ChannelSidebar = () => {
  const { t } = useTranslation();
  const { data: channels, isLoading, refetch } = useGetChannelsQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const dispatch = useDispatch();
  const handleShowModal = (modalName) => {
    dispatch(setChannelModal({ modalName }));
  };
  useEffect(() => {
    if (channels && currentChannelId === 1) {
      const { id, name } = channels[0];
      dispatch(changeChannel({ id, name }));
    }
  }, [channels, currentChannelId, dispatch]);
  useEffect(() => {
    const handleChannel = async () => {
      await refetch();
    };

    socket.on('newChannel', handleChannel);
    socket.on('removeChannel', handleChannel);
    socket.on('renameChannel', handleChannel);

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [refetch]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channelSidebar.title')}</b>
        {isLoading && <Loading />}
        <button onClick={() => handleShowModal('adding')} type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ModalContainer />
      <ul id="channel-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => (
          <DropdownButton key={channel.id} data={channel} />
        ))}
      </ul>
    </div>
  );
};

export default ChannelSidebar;
