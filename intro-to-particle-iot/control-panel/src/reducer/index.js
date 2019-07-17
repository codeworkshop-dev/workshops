const SET_TOKEN = 'SET_TOKEN';

export const actions = {
  setToken: (token) => ({ payload: token, type: SET_TOKEN }),
};

export default function reducer(state, { type, payload }) {
  switch (type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: payload,
      };
    }

    default:
      return state;
  }
}
