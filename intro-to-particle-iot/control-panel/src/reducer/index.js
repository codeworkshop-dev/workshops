import debounce from '../utils/debounce';

const SET_TOKEN = 'SET_TOKEN';
const SET_DEVICES = 'SET_DEVICES';
const SET_DEVICE_STATUS = 'SET_DEVICE_STATUS';
export const APP_SESSION_KEY = 'app';

export const actions = {
  setToken: (token) => ({ payload: token, type: SET_TOKEN }),
  setDevices: (devices) => ({ payload: devices, type: SET_DEVICES }),
  setDeviceStatus: (id, status) => ({
    payload: { id, status },
    type: SET_DEVICE_STATUS,
  }),
};

const persistState = debounce((state) => {
  try {
    const persistedState = persistedKeys.reduce((persistedState, key) => {
      persistedState[key] = state[key];
      return persistedState;
    }, {});

    sessionStorage.setItem(APP_SESSION_KEY, JSON.stringify(persistedState));
  } catch (ex) {}
}, 200);

const persistedKeys = ['token'];

function getNextState(state, { type, payload }) {
  switch (type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: payload,
      };
    }

    case SET_DEVICES: {
      return {
        ...state,
        devices: payload,
      };
    }

    case SET_DEVICE_STATUS: {
      const { id, status } = payload;
      return {
        ...state,
        devices: state.devices.map((device) => {
          if (device.id === id) {
            return {
              ...device,
              ...status,
            };
          } else {
            return device;
          }
        }),
      };
    }

    default:
      return state;
  }
}

export default function reducer(state, action) {
  const nextState = getNextState(state, action);
  persistState(nextState);
  return nextState;
}
