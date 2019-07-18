import React, { useEffect, useState } from 'react';
import InternetButtonCard from './InternetButtonCard';
import useAppState from './hooks/useAppState';
import styles from './DashboardPage.module.css';
import particle from './particle';
import { actions } from './reducer';
import InternetButtonModal from './InternetButtonModal';

export default function DashboardPage(props) {
  const [{ token, devices }, dispatch] = useAppState();
  const [focusedDevice, setDeviceFocus] = useState();

  useEffect(() => {
    let changed = false;

    particle
      .listDevices({ auth: token })
      .then((response) => response.body)
      .catch(() => [])
      .then((devices) => {
        if (!changed) {
          dispatch(actions.setDevices(devices));
        }
      });

    return () => {
      changed = true;
    };
  }, [token]);

  // No devices, nothing to see here...
  if (!devices || !devices.length) {
    return null;
  }

  return (
    <div className={styles.root}>
      {devices.map((device) => (
        <InternetButtonCard
          key={device.id}
          device={device}
          onClick={(device) => {
            setDeviceFocus(device);
          }}
        />
      ))}
      {focusedDevice ? (
        <InternetButtonModal
          onClose={setDeviceFocus}
          deviceId={focusedDevice.id}
        />
      ) : null}
    </div>
  );
}
