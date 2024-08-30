import { createSlice } from '@reduxjs/toolkit';
import channelsApi from '../../api/channelsApi';
import messagesApi from '../../api/messagesApi';

const initialState = {
  currentChannelId: 1,
  currentChannelName: 'general',
  message: '',
  showModal: '',
  modalChannelId: '',
  modalChannelName: '',
  isSuccses: false,
  error: null,
  isOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeChannel: (state, { payload }) => {
      Object.assign(state, {
        currentChannelId: payload.id,
        currentChannelName: payload.name,
      });
    },
    setChannelModal: (state, { payload }) => {
      Object.assign(state, {
        showModal: payload.modalName,
        isOpen: true,
        modalChannelId: payload.id,
        modalChannelName: payload.name,
      });
    },
    setDefaultChannel: (state) => {
      Object.assign(state, {
        currentChannelId: 1,
        currentChannelName: 'general',
      });
    },
    closeModal: (state) => {
      Object.assign(state, {
        showModal: '',
        modalChannelId: '',
        modalChannelName: '',
        error: null,
        isSuccses: false,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(channelsApi.endpoints.addChannel.matchPending, (state) => {
        Object.assign(state, {
          isSuccses: false,
          error: null,
          isOpen: true,
        });
      })
      .addMatcher(channelsApi.endpoints.addChannel.matchFulfilled, (state, { payload }) => {
        const { name, id } = payload;
        Object.assign(state, {
          currentChannelName: name,
          currentChannelId: id,
          isSuccses: true,
          error: null,
          isOpen: false,
        });
      })
      .addMatcher(channelsApi.endpoints.addChannel.matchRejected, (state, { payload }) => {
        Object.assign(state, {
          isSuccses: false,
          error: payload.status,
        });
      })
      .addMatcher(channelsApi.endpoints.removeChannel.matchPending, (state) => {
        Object.assign(state, {
          isSuccses: false,
          error: null,
          isOpen: true,
        });
      })
      .addMatcher(channelsApi.endpoints.removeChannel.matchFulfilled, (state) => {
        Object.assign(state, {
          isSuccses: true,
          error: null,
          isOpen: false,
        });
      })
      .addMatcher(channelsApi.endpoints.removeChannel.matchRejected, (state, { payload }) => {
        Object.assign(state, {
          isSuccses: false,
          error: payload.status,
        });
      })
      .addMatcher(channelsApi.endpoints.editChannel.matchPending, (state) => {
        Object.assign(state, {
          isSuccses: false,
          error: null,
          isOpen: true,
        });
      })
      .addMatcher(channelsApi.endpoints.editChannel.matchFulfilled, (state, { payload }) => {
        const { name, id } = payload;
        Object.assign(state, {
          currentChannelName: name,
          currentChannelId: id,
          isSuccses: true,
          error: null,
          isOpen: false,
        });
      })
      .addMatcher(channelsApi.endpoints.editChannel.matchRejected, (state, { payload }) => {
        Object.assign(state, {
          isSuccses: false,
          error: payload.status,
        });
      })
      .addMatcher(messagesApi.endpoints.addMessage.matchPending, (state) => {
        Object.assign(state, {
          error: null,
        });
      })
      .addMatcher(messagesApi.endpoints.addMessage.matchFulfilled, (state, { payload }) => {
        const { message } = payload;
        Object.assign(state, {
          error: null,
          message,
        });
      })
      .addMatcher(messagesApi.endpoints.addMessage.matchRejected, (state, { payload }) => {
        Object.assign(state, {
          isSuccses: false,
          error: payload.status,
        });
      });
  },
});

export const {
  changeChannel,
  setChannelModal,
  setDefaultChannel,
  closeModal,
} = appSlice.actions;
export const selectCurrentChannelId = (state) => state.app.currentChannelId;
export const selectCurrentChannelName = (state) => state.app.currentChannelName;
export const selectIsSuccses = (state) => state.app.isSuccses;
export const selectModalChannelName = (state) => state.app.modalChannelName;
export const selectModalChannelId = (state) => state.app.modalChannelId;
export const selectShowModal = (state) => state.app.showModal;
export const selectError = (state) => state.app.error;
export const selectIsOpen = (state) => state.app.isOpen;
export default appSlice.reducer;
