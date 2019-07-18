import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import particle from './particle';
import useAppState from './hooks/useAppState';
import { actions } from './reducer';
import styles from './TokenPage.module.css';

function TokenPage({ match }) {
  const inputRef = useRef();
  const [state, dispatch] = useAppState();
  const tokenRef = useRef(match.url === '/' ? state.token : null);

  return (
    <div className={styles.root}>
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          const token = (tokenRef.current = inputRef.current.value);
          dispatch(actions.setToken(token));
        }}
      >
        <div className={styles.inputBox}>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            name="token"
            placeholder="token"
            disabled={tokenRef.current}
            className={styles.input}
          />
          <input
            type="submit"
            value={tokenRef.current ? 'Loading' : 'Get Devices'}
            className={styles.button}
          />
          {tokenRef.current ? <Redirect push to="/dashboard" /> : null}
        </div>
      </form>
    </div>
  );
}

export default TokenPage;
