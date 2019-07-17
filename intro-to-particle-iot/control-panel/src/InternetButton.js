import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InternetButtonLights from './InternetButtonLights';
import styles from './InternetButton.module.css';
import useAppState from './hooks/useAppState';
import particle from './particle';
import classnames from './utils/classnames';

function InternetButton({ device }) {
  const [{ token }] = useAppState();
  const [lights, setLights] = useState({});
  const [connected, setConnected] = useState(device.connected);
  console.log(device);
  useEffect(() => {
    particle
      .getEventStream({ deviceId: device.id, auth: token })
      .then(function(stream) {
        console.log('start stream');
        stream.on('event', function({ data, name }) {
          console.log('Event: ', data);
          if (name === 'spark/status') {
            if (data === 'online') {
              setConnected(true);
            }

            if (data === 'offline') {
              setConnected(false);
            }
          }
        });
      });
  }, [device.id]);

  return (
    <div className={classnames(styles.root, !connected && styles.inactive)}>
      <div className={styles.glass} />
      <InternetButtonLights
        // onLightClick={props.onLightClick}
        lights={lights}
      />
      <div className={styles.center}>
        <div className={styles.usbPort} />
        <img src="/images/photon_vector2_600.png" className={styles.chip} />
      </div>
    </div>
  );
}

InternetButton.propTypes = {
  lights: PropTypes.array,
};

export default InternetButton;
