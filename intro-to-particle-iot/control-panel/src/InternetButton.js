import React from 'react';
import PropTypes from 'prop-types';
import InternetButtonLights from './InternetButtonLights';
import styles from './InternetButton.module.css';
import classnames from './utils/classnames';

function InternetButton({ device, onLightClick }) {
  const { orientation: { x = 0, y = 0, z = 0 } = {} } = device;

  return (
    <div
      className={classnames(styles.root, !device.connected && styles.inactive)}
      style={{
        transform: `rotate3d(1,0,0,${x}deg) rotate3d(0,1,0,${y}deg) rotate3d(0,0,1,${z}deg)`,
      }}
    >
      <div className={styles.glass} />
      <InternetButtonLights
        onLightClick={onLightClick}
        lights={device.lights}
        brightness={device.brightness}
      />
      <div className={styles.center}>
        <div className={styles.usbPort} />
        <img src="/images/photon_vector2_600.png" className={styles.chip} />
      </div>
    </div>
  );
}

InternetButton.propTypes = {
  device: PropTypes.object,
};

export default InternetButton;
