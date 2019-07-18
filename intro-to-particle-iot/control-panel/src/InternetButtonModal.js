import React, { useCallback, useState } from 'react';
import styles from './InternetButtonModal.module.css';
import InternetButton from './InternetButton';
import LightBulbIcon from './icons/LightBulbIcon';
import CancelIcon from './icons/CancelIcon';
import CompassIcon from './icons/CompassIcon';
import { CirclePicker, AlphaPicker } from 'react-color';
import particle from './particle';
import useAppState from './hooks/useAppState';
import useDeviceStatus from './hooks/useDeviceStatus';

export default function InternetButtonModal({ deviceId, onClose = () => {} }) {
  const [{ token, devices }] = useAppState();
  const device = devices.find((d) => d.id === deviceId);
  const [selectedColor, setColor] = useState();
  const { orientation = {} } = device;
  const onColorChange = useCallback((c) => {
    setColor(c);
  }, []);

  useDeviceStatus(device.id);

  return (
    <div className={styles.root}>
      <button className={styles.cancelButton} onClick={() => onClose()}>
        <CancelIcon width={32} />
      </button>
      <div className={styles.column}>
        <InternetButton
          device={device}
          onLightClick={(light) => {
            if (selectedColor) {
              const { rgb } = selectedColor;
              particle.callFunction({
                deviceId: device.id,
                name: 'setLights',
                argument: `${light},${rgb.r},${rgb.g},${rgb.b}`,
                auth: token,
              });
            }
          }}
        />
      </div>
      <div className={styles.column}>
        <h1 className={styles.heading}>Device name: {device.name}</h1>
        <h2>Device id: {device.id}</h2>
        <div>
          <h4 className={styles.sectionHeading}>
            <div className={styles.sectionHeadingIcon}>
              <LightBulbIcon width={40} />
            </div>
            <div className={styles.sectionHeadingText}>Lights</div>
          </h4>
          <div className={styles.colorPickerBox}>
            <CirclePicker
              hex={selectedColor ? selectedColor.hex : null}
              onChange={onColorChange}
              circleSpacing={20}
              circleSize={32}
              width={360}
            />
            <br />
            <AlphaPicker
              width={290}
              onChangeComplete={(event) => {
                const nextBrightness = Math.floor(event.rgb.a * 255);

                if (device.brightness !== nextBrightness) {
                  particle.callFunction({
                    deviceId: device.id,
                    name: 'setLights',
                    argument: `${nextBrightness}%${device.lights
                      .map((rgb, i) => `${i + 1},${rgb}`)
                      .join(';')}`,
                    auth: token,
                  });
                }
              }}
            />
          </div>
        </div>
        <div>
          <h4 className={styles.sectionHeading}>
            <div className={styles.sectionHeadingIcon}>
              <CompassIcon width={40} />
            </div>
            <div className={styles.sectionHeadingText}>Orientation</div>
          </h4>
          <div className={styles.colorPickerBox}>
            <dl className={styles.orientationGrid}>
              <dt>X:</dt>
              <dd>{orientation.x}</dd>
              <dt>Y:</dt>
              <dd>{orientation.y}</dd>
              <dt>Z:</dt>
              <dd>{orientation.z}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
