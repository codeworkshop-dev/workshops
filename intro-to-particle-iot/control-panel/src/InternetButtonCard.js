import React, { useCallback, useEffect, useState } from 'react';
import InternetButton from './InternetButton';
import styles from './InternetButtonCard.module.css';
import getRandomRgb from './utils/getRandomRgb';
import particle from './particle';
import useAppState from './hooks/useAppState';
import { actions } from './reducer';
import getDeviceStatus from './utils/getDeviceStatus';

export default function InternetButtonCard({ device, onClick = () => {} }) {
  const [state, dispatch] = useAppState();
  const [connected, setConnected] = useState(device.connected);
  const { token } = state;
  const identifyButton = useCallback((ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const generatedLightColors = [...Array(11)].map(() =>
      getRandomRgb().join(','),
    );

    dispatch(
      actions.setDeviceStatus(device.id, { lights: generatedLightColors }),
    );

    particle.callFunction({
      deviceId: device.id,
      name: 'setLights',
      argument: generatedLightColors
        .map((rgb, i) => `${i + 1},${rgb}`)
        .join(';'),
      auth: token,
    });
  }, []);
  // Get the button status
  useEffect(() => {
    particle
      .getEventStream({ deviceId: device.id, auth: token })
      .then(function(stream) {
        stream.on('event', function({ data, name }) {
          if (name === 'spark/status') {
            if (data === 'online') {
              setConnected(true);
            }

            if (data === 'offline') {
              setConnected(false);
            }
          }
        });
      })
      .catch()
      .then(() => getDeviceStatus(device.id, token))
      .then((status) => dispatch(actions.setDeviceStatus(device.id, status)));
  }, [device.id]);

  return (
    <div className={styles.root} onClick={() => onClick(device)}>
      <div className={styles.buttonBox}>
        <InternetButton device={device} />
      </div>
      <div className={styles.contentBox}>
        <h3 className={styles.contentHeading}>{device.name}</h3>
        <dl className={styles.contentDetails}>
          <dt>connected:</dt>
          <dd>{device.connected}</dd>
          <dt>firware version:</dt>
          <dd>{device.system_firmware_version}</dd>
        </dl>
        <button className={styles.identifyButton} onClick={identifyButton}>
          Identify
        </button>
      </div>
    </div>
  );
}
